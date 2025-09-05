import { ClipLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Paginator } from "../components/Paginator";

const SearchPage = () => {
    const [query] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [products, setproducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const searchText = query.get("q") || "";
    const navigate = useNavigate();
    console.log(searchText);
    const LIMIT_PER_PAGE = 10
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?q=${searchText}&limit=${LIMIT_PER_PAGE}&page=${page}`, {
                method: "GET",
                credentials: "include",
            });
            const result = await response.json();
            setTotal(result.data.total);
            setproducts(result.data.products);
        }
        catch (err) {
            console.error("Error fetching products:", err);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [searchText, page])

    const handleViewProduct = (id) => {
        navigate(`/view/${id}`)
    }
    return (
        <>
            {loading ? (
                <div className="px-4 py-6 animate-pulse space-y-4">
                    {/* Filters + Products container */}
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Sidebar filters skeleton */}
                        <div className="w-full md:w-64 bg-gray-200 rounded-lg p-3 flex-shrink-0 space-y-3">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                        </div>

                        {/* Product list skeleton */}
                        <div className="flex-1 flex flex-col gap-5">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row gap-3 sm:gap-5 p-3 border rounded-xl bg-gray-100"
                                >
                                    {/* Product image */}
                                    <div className="w-full sm:w-40 h-48 sm:h-40 bg-gray-300 rounded-md flex-shrink-0"></div>

                                    {/* Product info */}
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                                        <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination skeleton */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="h-8 w-14 bg-gray-300 rounded-md"
                            ></div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {/* Filters + Products container */}
                    <div className="flex flex-col md:flex-row m-2 gap-3">
                        {/* Sidebar filters */}
                        <div className="w-full md:w-64 bg-blue-100 p-3 rounded-lg shadow-md flex-shrink-0">
                            <h2 className="text-lg font-bold mb-2">Filters</h2>
                            {/* Add your filter options here */}
                        </div>

                        {/* Product list */}
                        <div className="flex-1 flex flex-col gap-5 p-3 rounded-lg shadow-md">
                            {products?.map((elem) => (
                                <div
                                    key={elem._id}
                                    className="flex flex-col sm:flex-row text-base sm:text-lg lg:text-xl p-3 sm:p-5 border-2 border-amber-600 rounded-xl gap-3 sm:gap-5 cursor-pointer hover:scale-102 transition-transform w-full"
                                    role="button"
                                    onClick={() => handleViewProduct(elem._id)}
                                >
                                    {/* Product image */}
                                    <div className="w-full sm:w-40 flex-shrink-0 h-48 sm:h-auto flex items-center justify-center">
                                        <img
                                            src={elem.images?.[0]}
                                            alt={elem.title}
                                            className="w-full h-full object-contain rounded-md"
                                        />
                                    </div>

                                    {/* Product info */}
                                    <div className="flex-1">
                                        <h1 className="font-bold text-fuchsia-500 line-clamp-2">
                                            {elem.title}
                                        </h1>
                                        <p>Rs. {elem.price}</p>
                                        <p>In stock: {elem.quantity}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Empty state */}
                            {products?.length === 0 && (
                                <>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 text-center mt-5">
                                        Sorry, no results found for
                                        <span className="text-red-500 underline"> {searchText}</span>
                                    </p>
                                    <p className="mb-5 text-center">
                                        Please check the spelling or try searching for something else
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-wrap justify-center mt-4 gap-2">
                        {Array.from({ length: Math.ceil(total / LIMIT_PER_PAGE) }, (_, i) => i + 1).map(
                            (pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setPage(pageNum)}
                                    className={`px-3 py-1 rounded-md border ${pageNum === page
                                            ? "bg-pink-950 text-white"
                                            : "bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
                                        } w-[18%] sm:w-auto`}
                                >
                                    {pageNum}
                                </button>
                            )
                        )}
                    </div>
                </>
            )}
        </>
    );



}

export default SearchPage;