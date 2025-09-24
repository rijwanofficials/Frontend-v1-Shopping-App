import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Button from "../../components/ui/button";
import { ShowErrorToast, ShowSuccessToast } from "../../utils/ToastMessageHelper";

const LIMIT_PER_PAGE = 50;

const AdminProductPage = () => {
  const [query] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editProductId, setEditProductId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // to disable only the current product's save button

  const searchText = query.get("q") || "";
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products?q=${searchText}&limit=${LIMIT_PER_PAGE}&page=${page}`,
        { method: "GET", credentials: "include" }
      );
      const result = await response.json();
      setTotal(result.data.total);
      setProducts(result.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [searchText, page]);

  const handleEditClick = (e, product) => {
    e.stopPropagation();
    setEditProductId(product._id);
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value.trim();
    const price = Number(form.price.value);
    const quantity = Number(form.quantity.value);

    if (!title) {
      ShowErrorToast("Title is required");
      return;
    }
    if (isNaN(price) || price <= 1) {
      ShowErrorToast("Price should be a number greater than 1");
      return;
    }
    if (isNaN(quantity) || quantity < 0) {
      ShowErrorToast("Quantity should be a non-negative number");
      return;
    }

    try {
      setUpdatingId(editProductId);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admins/products/${editProductId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, price, quantity }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        ShowSuccessToast("Product updated successfully");
        const updatedProduct = result.data.product;

        setProducts((prevProducts) => {
          const exists = prevProducts.some(p => p._id === updatedProduct._id);
          if (exists) {
            // Update the existing product
            return prevProducts.map(p => p._id === updatedProduct._id ? updatedProduct : p);
          } else {
            // Insert at top if not on the current page
            return [updatedProduct, ...prevProducts];
          }
        });

        setEditProductId(null);
      } else {
        ShowErrorToast(result.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      ShowErrorToast("Something went wrong while updating the product");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleViewProduct = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div className="max-w-screen-xl w-full min-h-screen mx-auto px-2">
      <div className="flex-1 flex flex-col w-full">
        {loading ? (
          <div className="px-4 py-1 animate-pulse space-y-4">
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="flex-1 flex flex-col gap-5 w-full">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-3 border rounded-xl bg-gray-100 max-w-full"
                  >
                    <div className="w-full sm:w-40 h-48 sm:h-40 bg-gray-300 rounded-md flex-shrink-0 max-w-full"></div>
                    <div className="flex-1 space-y-2 max-w-full">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="h-8 w-14 bg-gray-300 rounded-md"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-3 px-3 py-3 max-w-full w-full">
              <div className="flex-1 flex flex-col gap-5 p-3 rounded-lg shadow-md max-w-full w-full">
                {products?.map((elem) => (
                  <div
                    key={elem._id}
                    className="flex flex-col text-base sm:text-lg lg:text-xl p-3 sm:p-5 border-2 border-amber-600 rounded-xl gap-3 sm:gap-5 cursor-pointer hover:scale-102 transition-transform w-full h-full max-w-full"
                    onClick={
                      editProductId === elem._id ? undefined : () => handleViewProduct(elem._id)
                    }
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 max-w-full">
                      <div className="w-full sm:w-40 h-48 sm:h-40 flex-shrink-0 flex items-center justify-center relative overflow-hidden rounded-md max-w-full max-h-48 sm:max-h-full">
                        <img
                          src={elem.images?.[0] || ""}
                          alt={elem.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 flex flex-col min-h-[128px] max-w-full">
                        {editProductId === elem._id ? (
                          <form className="flex flex-col flex-1 gap-2" onSubmit={handleSave}>
                            <label className="font-semibold" htmlFor="title">
                              Title
                            </label>
                            <input
                              id="title"
                              type="text"
                              name="title"
                              defaultValue={elem.title}
                              className="border rounded px-2 py-1 flex-grow"
                            />
                            <label className="font-semibold" htmlFor="price">
                              Price
                            </label>
                            <input
                              id="price"
                              type="number"
                              name="price"
                              defaultValue={elem.price}
                              className="border rounded px-2 py-1 flex-grow"
                            />
                            <label className="font-semibold" htmlFor="quantity">
                              Quantity
                            </label>
                            <input
                              id="quantity"
                              type="number"
                              name="quantity"
                              defaultValue={elem.quantity}
                              className="border rounded px-2 py-1 flex-grow"
                            />
                            <div className="flex gap-2 mt-auto">
                              <Button type="submit" disabled={updatingId === elem._id}>
                                {updatingId === elem._id ? "Updating..." : "Save"}
                              </Button>
                              <Button type="button" onClick={handleCancelEdit}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex flex-col flex-1 justify-between">
                            <div className="flex-1 flex flex-col space-y-1">
                              <h1 className="font-bold text-fuchsia-500 line-clamp-2">{elem.title}</h1>
                              <p>Rs. {elem.price}</p>
                              <p>In stock: {elem.quantity}</p>
                            </div>
                            <div className="mt-auto flex gap-2">
                              <Button onClick={(e) => handleEditClick(e, elem)}>Edit</Button>
                              <Button onClick={(e) => e.stopPropagation()}>Delete</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center mt-4 gap-2 w-full max-w-full">
              {Array.from({ length: Math.ceil(total / LIMIT_PER_PAGE) }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded-md border ${
                      pageNum === page ? "bg-blue-600 text-white" : "bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
                    } w-[18%] sm:w-auto`}
                    aria-current={pageNum === page ? "page" : undefined}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { AdminProductPage };
