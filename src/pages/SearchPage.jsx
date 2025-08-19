import { ClipLoader } from "react-spinners";
import { useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Paginator } from "../components/Paginator";

const SearchPage = () => {
    const [query] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [products, setproducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const searchText = query.get("q") || "";
    console.log(searchText);
    const LIMIT_PER_PAGE = 10
    const getAllProducts = async () => {
        try {
            setLoading(true);
            console.log("Fetching products for search:", searchText);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products?q=${searchText}&limit=${LIMIT_PER_PAGE}&page=${page}`, {
                method: "GET",
            });
            const result = await response.json();
            console.log("----API returned----:", result);
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
    return (
        <>
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader size={150} />
                </div>
            ) : (
                <>
                    <div className="flex m-2 gap-3">
                        <div className="w-64 bg-blue-100 p-3 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-2">Filters</h2>
                        </div>
                        <div className="flex-1 flex flex-col bg-emerald-100 gap-5 p-3 rounded-lg shadow-md">
                            {products?.map((elem) => (
                                <div
                                    key={elem._id}
                                    className=" flex text-2xl p-5 border-2 border-amber-600 rounded-xl"
                                >
                                    <div className="w-50 h-50">
                                        <img src={elem.images?.[0]} alt={elem.title} className="w-full" />
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="font-bold text-fuchsia-500">{elem.title}</h1>
                                        <p>Rs. {elem.price}</p>
                                        <p>In stock: {elem.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            {products?.length === 0 && (
                                <>
                                    <p className="text-2xl font-bold text-emerald-600 text-center mt-5">
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
                    <div className="flex justify-center mt-4">
                        <Paginator
                            limit={LIMIT_PER_PAGE}
                            page={page}
                            total={total}
                            handlePageClick={(val) => setPage(val)}
                        />
                    </div>


                </>

            )}
        </>
    )
}

export default SearchPage;