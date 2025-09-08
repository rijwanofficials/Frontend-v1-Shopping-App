import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { ShowErrorToast } from "../utils/ToastMessageHelper";
import { useAuthContext } from "../Context/AppContext";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ClipLoader from "react-spinners/ClipLoader";

const ViewPage = () => {
    const [loading, setLoading] = useState(false);
    const [productsInfo, setProductsInfo] = useState(null);
    const [frame, setFrame] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        isLoggedIn,
        addtoCart,
        removeFromCart,
        cart,
        addingItems,
        removingItems,
    } = useAuthContext();

    // Fetch product details
    const viewProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/view/${id}`,
                { method: "GET", credentials: "include" }
            );
            if (!response.ok) {
                console.error("Failed to fetch product:", response.status);
                return;
            }
            const result = await response.json();
            setProductsInfo(result.data.product);
        } catch (err) {
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewProducts();
    }, [id]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            ShowErrorToast("Please log in to add products to the cart");
            navigate(`/login?redirect=/view/${id}`);
            return;
        }
        await addtoCart(productsInfo._id);
    };

    const handleRemoveFromCart = async () => {
        if (!isLoggedIn) {
            ShowErrorToast("Please log in to update the cart");
            navigate(`/login?redirect=/view/${id}`);
            return;
        }
        await removeFromCart(productsInfo._id);
    };

    // Find if product is already in cart
    const currentItem = Object.values(cart).find(
        (item) => item.productId?._id === productsInfo?._id
    );

    return (
        <>
            {loading ? (
                <div className="px-4 py-6 animate-pulse space-y-6">
                    <div className="h-8 w-3/4 bg-gray-300 rounded mx-auto"></div>

                    <div className="w-11/12 sm:w-3/4 h-64 sm:h-80 bg-gray-300 rounded-lg mx-auto"></div>

                    <div className="flex gap-3 justify-center mt-3">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-lg"></div>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-lg"></div>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-lg"></div>
                    </div>

                    <div className="flex justify-center mt-6 gap-2">
                        <div className="w-12 h-10 bg-gray-300 rounded"></div>
                        <div className="w-16 h-10 bg-gray-300 rounded"></div>
                        <div className="w-12 h-10 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ) : (
                <div className="px-4">
                    {productsInfo ? (
                        <>
                            <p className="text-center mt-5 mb-5 text-2xl font-semibold">
                                {productsInfo.title}
                            </p>

                            {/* Product Images */}
                            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
                                <div className="relative w-full bg-white shadow rounded-lg p-2 flex justify-center items-center">
                                    <button
                                        onClick={() =>
                                            setFrame(
                                                (prev) =>
                                                    (prev - 1 + productsInfo.images.length) %
                                                    productsInfo.images.length
                                            )
                                        }
                                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-600 transition"
                                    >
                                        <HiChevronLeft size={35} />
                                    </button>
                                    <img
                                        src={productsInfo.images[frame]}
                                        alt={productsInfo.title}
                                        className="w-full max-h-[240px] sm:max-h-[320px] object-contain rounded-md"
                                    />
                                    <button
                                        onClick={() =>
                                            setFrame((prev) => (prev + 1) % productsInfo.images.length)
                                        }
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-600 transition"
                                    >
                                        <HiChevronRight size={35} />
                                    </button>
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 mt-3">
                                    {productsInfo.images?.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`w-20 h-20 sm:w-24 sm:h-24 border rounded-lg overflow-hidden cursor-pointer transition-transform ${frame === i
                                                    ? "border-pink-500 shadow-lg scale-105"
                                                    : "hover:scale-105 hover:shadow-md"
                                                }`}
                                            onClick={() => setFrame(i)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${productsInfo.title}-${i}`}
                                                className="w-full h-full object-contain bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cart Section */}
                            <div className="flex items-center justify-center mt-6">
                                {productsInfo?.quantity <= 0 ? (
                                    // 1️⃣ Out of stock
                                    <p className="text-red-600 bg-amber-300 p-1 rounded-md font-semibold text-lg">
                                        Out of Stock
                                    </p>
                                ) : currentItem ? (
                                    // 2️⃣ Already in cart → show - qty +
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline-primary"
                                            onClick={handleRemoveFromCart}
                                            disabled={removingItems[productsInfo._id]}
                                            className="flex items-center justify-center w-12 h-10"
                                        >
                                            {removingItems[productsInfo._id] ? (
                                                <ClipLoader size={16} color="#fff" />
                                            ) : (
                                                "-"
                                            )}
                                        </Button>

                                        <p className="border rounded-lg px-6 py-2">
                                            {currentItem.cartQuantity}
                                        </p>

                                        <Button
                                            variant="outline-primary"
                                            onClick={handleAddToCart}
                                            disabled={
                                                addingItems[productsInfo._id] ||
                                                currentItem.cartQuantity >= productsInfo.quantity
                                            }
                                            className="flex items-center justify-center w-12 h-10"
                                        >
                                            {addingItems[productsInfo._id] ? (
                                                <ClipLoader size={16} color="#fff" />
                                            ) : (
                                                "+"
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    // 3️⃣ Not in cart yet → Add to cart button
                                    <Button
                                        onClick={handleAddToCart}
                                        className="px-8 py-3 text-lg rounded-xl flex items-center justify-center"
                                        disabled={addingItems[productsInfo._id]}
                                    >
                                        {addingItems[productsInfo._id] ? (
                                            <ClipLoader size={18} color="#fff" />
                                        ) : (
                                            "Add to Cart"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-lg mt-10">No product found</p>
                    )}
                </div>
            )}
        </>
    );

};

export default ViewPage;
