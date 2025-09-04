import { useEffect, useState } from "react";
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
    const { isLoggedIn, addtoCart, cart } = useAuthContext();
    console.log(isLoggedIn);
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
            addtoCart(productsInfo._id);
        }
        else {
            ShowErrorToast("Please log in to add products to the cart");
            navigate(`/login?redirect=/view/${id}`);
        }
    }

    const currentItem = cart[id]

    return (
        <>

            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <ClipLoader size={100} />
                </div>
            ) : (
                <div className="px-4">
                    {productsInfo ? (
                        <>
                            <p className="text-center mt-5 mb-5 text-2xl font-semibold">
                                {productsInfo.title}
                            </p>
                            <div className="relative bg-white shadow-md rounded-xl p-4 max-w-2xl mx-auto flex justify-center items-center overflow-hidden">
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
                                <img
                                    src={productsInfo.images[frame]}
                                    alt={productsInfo.title}
                                    className="w-full max-h-[400px] object-contain rounded-lg shadow-sm"
                                />
                                <span
                                    onClick={() =>
                                        setFrame((prev) => (prev + 1) % productsInfo.images.length)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-600 cursor-pointer hover:text-black"
                                >
                                    {">"}
                                </span>
                            </div>
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
                            <div className="flex items-center justify-center p-5">


                                {currentItem ? (
                                    <div className="flex gap-1">
                                        <Button variant="outline-primary" >-</Button>
                                        <p className="border-1 rounded-2xl px-7"> {currentItem.cartQuantity}</p>
                                        <Button variant="outline-primary"
                                            onClick={handleAddToCart} >+</Button>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={handleAddToCart}
                                        className="px-8 py-4 text-lg rounded-xl"
                                    >
                                        Add to Cart
                                    </Button>
                                )
                                }
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
