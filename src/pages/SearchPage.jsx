import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Context/AppContext";
import { CartSideBar } from "../components/ui/CartSideBar";

const SearchPage = () => {
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: "beauty", label: "Beauty" },
    { id: "womens-dresses", label: "Women's Dresses" },
    { id: "womens-jewellery", label: "Women's Jewellery" },
    { id: "womens-watches", label: "Women's Watches" },
    { id: "womens-shoes", label: "Women's Shoes" },
    { id: "womens-bags", label: "Women's Bags" },
    { id: "motorcycle", label: "Motorcycle" },
    { id: "groceries", label: "Groceries" },
    { id: "furniture", label: "Furniture" },
    { id: "sports-accessories", label: "Sports Accessories" },
    { id: "laptops", label: "Laptops" }, // ✅ Added new laptop category
  ];

  const searchText = query.get("q") || "";
  const navigate = useNavigate();
  const { cart } = useAuthContext();
  const isCartEmpty = !cart || Object.values(cart).length === 0;

  const LIMIT_PER_PAGE = 10;

  useEffect(() => {
    const categoryFromURL = query.get("category");
    if (categoryFromURL) {
      setSelectedCategories(categoryFromURL.split(","));
    }
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchText) params.set("q", searchText);
    if (selectedCategories.length > 0)
      params.set("category", selectedCategories.join(","));
    params.set("page", page);
    params.set("minPrice", minPrice);
    params.set("maxPrice", maxPrice);

    navigate(`/search?${params.toString()}`, { replace: true });
  }, [searchText, page, selectedCategories, maxPrice, minPrice]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, selectedCategories, maxPrice, minPrice]);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const params = {
        q: searchText,
        limit: LIMIT_PER_PAGE,
        page,
        minPrice,
        ...(maxPrice !== Infinity && { maxPrice }),
        ...(selectedCategories.length > 0 && {
          category: selectedCategories.join(","),
        }),
      };

      console.log("🔍 Fetching with params:", params);

      const queryString = new URLSearchParams(params).toString();

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products?${queryString}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();

      if (response.ok && result.isSuccess) {
        console.log("✅ Products fetched:", result.data.products?.length);
        setProducts(result.data.products || []);
        setTotal(result.data.total || 0);
      } else {
        console.error("❌ Error:", result.message);
        setProducts([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    getAllProducts();
  }, [searchText, page, selectedCategories, maxPrice, minPrice]);

  const handleViewProduct = (id) => navigate(`/view/${id}`);

  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxPrice(500000);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full min-h-screen">
      <div className={`flex-1 flex flex-col ${!isCartEmpty ? "pr-[178px]" : ""}`}>
        <div className="flex flex-col md:flex-row gap-3 px-3 py-3">
          {/* 🔹 Sidebar Filters */}
          <div className="w-full md:w-64 bg-blue-100 p-3 rounded-lg shadow-md flex-shrink-0">
            <h2 className="text-lg font-bold mb-2">Filters</h2>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Category</label>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={(e) => {
                        let updated;
                        if (e.target.checked) {
                          updated = [...selectedCategories, cat.id];
                        } else {
                          updated = selectedCategories.filter((c) => c !== cat.id);
                        }
                        setSelectedCategories(updated);
                        setPage(1);
                      }}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-5">
              <label className="block font-semibold mb-3">Price Range</label>
              <div className="flex flex-col gap-3">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    Up to{" "}
                    <span className="text-blue-700">
                      ₹{maxPrice.toLocaleString()}
                    </span>
                  </p>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 0 && val <= 500000) {
                        setMaxPrice(val);
                        setPage(1);
                      }
                    }}
                    className="w-28 border border-gray-400 rounded-md p-2 text-right font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="₹ Max"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Reset Filters
            </button>
          </div>

          {/* 🔹 Product List */}
          <div className="flex-1 flex flex-col gap-5 p-3 rounded-lg shadow-md">
            {loading ? (
              <div className="flex flex-col gap-5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-3 border rounded-xl bg-gray-100 animate-pulse"
                  >
                    <div className="w-full sm:w-40 h-48 sm:h-auto bg-gray-300 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center mt-5">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600">
                      Sorry, no results found for
                      <span className="text-red-500 underline">
                        {" "}
                        {searchText || "this filter"}
                      </span>
                    </p>
                    <p className="mb-5">
                      Try adjusting your filters or search again.
                    </p>
                  </div>
                ) : (
                  products.map((elem) => (
                    <div
                      key={elem._id}
                      className="flex flex-col sm:flex-row text-base sm:text-lg lg:text-xl p-3 sm:p-5 border-2 border-amber-600 rounded-xl gap-3 sm:gap-5 cursor-pointer hover:scale-102 transition-transform w-full"
                      onClick={() => handleViewProduct(elem._id)}
                    >
                      <div className="w-full sm:w-40 flex-shrink-0 h-48 sm:h-auto flex items-center justify-center">
                        <img
                          src={elem.images?.[0]}
                          alt={elem.title}
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h1 className="font-bold text-fuchsia-500 line-clamp-2">
                          {elem.title}
                        </h1>
                        <p>Rs. {elem.price}</p>
                        <p>In stock: {elem.quantity}</p>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* Pagination */}
            {!loading && total > 0 && (
              <div className="flex flex-wrap justify-center mt-4 gap-2 w-full">
                {Array.from(
                  { length: Math.ceil(total / LIMIT_PER_PAGE) },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded-md border ${
                      pageNum === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
                    } w-[18%] sm:w-auto`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {!isCartEmpty && <CartSideBar />}
    </div>
  );
};

export { SearchPage };
