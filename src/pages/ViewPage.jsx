import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";
import { useAuthContext } from "../Context/AppContext";

const ViewPage = () => {
    const [loading, setLoading] = useState(false);
    const [productsInfo, setProductsInfo] = useState(null);
    const [frame, setFrame] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthContext();
    console.log(isLoggedIn);
    console.log("🟢 Product ID from route:", id);
    const viewProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/view/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                console.error("Failed to fetch product:", response.status);
                return;
            }

            const result = await response.json();
            setProductsInfo(result.data.product);
            console.log("✅ setProductsInfo:", result.data.product);
        } catch (err) {
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewProducts();
    }, [id]);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            ShowSuccessToast("Product is added to the cart");
            // add to cart functionality
        }
        else {
            ShowErrorToast("Please log in to add products to the cart");
            // redirecting user after logged in
            navigate(`/login?redirect=/view/${id}`);
        }
    }

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <ClipLoader size={100} />
                </div>
            ) : (
                <div className="px-4"> {/* padding to prevent edge overflow */}
                    {productsInfo ? (
                        <>
                            <p className="text-center mt-5 mb-5 text-2xl font-semibold">
                                {productsInfo.title}
                            </p>

                            {/* Main Image with < > Controls */}
                            <div className="relative bg-white shadow-md rounded-xl p-4 max-w-2xl mx-auto flex justify-center items-center overflow-hidden">
                                {/* Left Icon */}
                                <span
                                    onClick={() =>
                                        setFrame(
                                            (prev) =>
                                                (prev - 1 + productsInfo.images.length) %
                                                productsInfo.images.length
                                        )
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600 cursor-pointer hover:text-black"
                                >
                                    {"<"}
                                </span>

                                {/* Main Image */}
                                <img
                                    src={productsInfo.images[frame]}
                                    alt={productsInfo.title}
                                    className="w-full max-h-[400px] object-contain rounded-lg shadow-sm"
                                />

                                {/* Right Icon */}
                                <span
                                    onClick={() =>
                                        setFrame((prev) => (prev + 1) % productsInfo.images.length)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600 cursor-pointer hover:text-black"
                                >
                                    {">"}
                                </span>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 mt-4 overflow-x-auto justify-center max-w-2xl mx-auto">
                                {productsInfo.images?.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`${productsInfo.title}-${i}`}
                                        onClick={() => setFrame(i)}
                                        className={`w-20 h-20 object-contain border rounded-lg cursor-pointer transition-transform ${frame === i ? "border-blue-500 scale-105" : "hover:scale-105"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Add to Cart Button */}
                            <div className="flex items-center justify-center p-5">
                                <Button
                                    onClick={handleAddToCart}
                                    className="px-8 py-4 text-lg rounded-xl"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>No product found</p>
                    )}
                </div>
            )}
        </>
    );


};

export default ViewPage;
