import { useNavigate } from "react-router";
import { useAuthContext } from "../../Context/AppContext";
import { ShowErrorToast } from "../../utils/ToastMessageHelper";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "./button";


const CartSideBar = () => {
    const {
        cart,
        addtoCart,
        removeFromCart,
        removingItems,
        addingItems,
        cartLoading,
        isLoggedIn,
        getCartItems
    } = useAuthContext();

    const navigate = useNavigate();
    const cartItems = Object.values(cart);

    // Hide sidebar completely if cart is empty
    if (!cartLoading && cartItems.length === 0) return null;

    const handleAddToCart = async (productId) => {
        if (!isLoggedIn) {
            ShowErrorToast("Please log in to add products to the cart");
            navigate(`/login?redirect=/view/${productId}`);
            return;
        }
        await addtoCart(productId);
    };

    const handleRemoveFromCart = async (productId) => {
        if (!isLoggedIn) {
            ShowErrorToast("Please log in to update the cart");
            navigate(`/login?redirect=/view/${productId}`);
            return;
        }
        await removeFromCart(productId);
    };

    const handleViewProduct = (productId) => {
        navigate(`/view/${productId}`);
    };

    const handleCheckout = async () => {
        if (!isLoggedIn) {
            ShowErrorToast("Please log in to checkout");
            navigate("/login?redirect=/checkout");
            return;
        }
        await getCartItems();
        navigate("/checkout", { state: { cart } });
    };

    if (cartLoading) {
        return (
            <div className="fixed right-0 top-0 w-[178px] h-screen bg-gray-100 p-3 border-l border-gray-300 flex justify-center items-center">
                <ClipLoader size={28} color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="fixed right-0 top-0 w-[178px] h-screen bg-gray-100 p-3 border-l border-gray-300 flex flex-col">
            <div className="overflow-y-auto flex-1 pr-1">
                {cartItems.length > 0 && (
                    <h2 className="text-md font-bold mb-3 text-center text-gray-800">
                        Your Cart Items
                    </h2>
                )}

                {cartItems.map((product) => {
                    const productId = product.productId._id;

                    return (
                        <div
                            key={productId}
                            className="mb-3 p-2 bg-white rounded-md shadow-sm hover:shadow-md transition"
                        >
                            {/* Product image */}
                            <div
                                className="w-full h-20 flex justify-center items-center cursor-pointer"
                                onClick={() => handleViewProduct(productId)}
                            >
                                <img
                                    src={product.productId?.images?.[0]}
                                    alt={product.productId?.title}
                                    className="max-h-16 object-contain"
                                />
                            </div>

                            {/* Title + Price */}
                            <p className="text-xs font-semibold mt-1 truncate">
                                {product.productId?.title}
                            </p>
                            <p className="text-sm font-bold text-pink-800">
                                ₹{product.productId?.price}
                            </p>

                            {/* Out of Stock + Buttons */}
                            <div className="flex flex-col items-center justify-center gap-1 mt-1">
                                {product.productId.quantity === 0 && (
                                    <span className="text-md text-red-600 bg-amber-300 px-2 py-1 rounded-md font-semibold">
                                        Out of Stock
                                    </span>
                                )}

                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline-primary"
                                        className="px-2 py-1 text-xs flex items-center justify-center"
                                        onClick={() => handleRemoveFromCart(productId)}
                                        disabled={removingItems[productId]}
                                    >
                                        {removingItems[productId] ? (
                                            <ClipLoader size={14} color="#36d7b7" />
                                        ) : (
                                            "-"
                                        )}
                                    </Button>

                                    <span className="text-xs">{product.cartQuantity}</span>

                                    <Button
                                        size="sm"
                                        variant="outline-primary"
                                        className="px-2 py-1 text-xs flex items-center justify-center"
                                        onClick={() => handleAddToCart(productId)}
                                        disabled={
                                            addingItems[productId] ||
                                            product.productId.quantity === 0
                                        }
                                    >
                                        {addingItems[productId] ? (
                                            <ClipLoader size={14} color="#36d7b7" />
                                        ) : (
                                            "+"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {cartItems.length > 0 && (
                    <div className="flex justify-center items-center mt-4">
                        <Button onClick={handleCheckout}>Checkout</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { CartSideBar };
