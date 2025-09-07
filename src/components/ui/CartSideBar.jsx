import { useNavigate } from "react-router";
import { useAuthContext } from "../../Context/AppContext";
import { ShowErrorToast } from "../../utils/ToastMessageHelper";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";

const CartSideBar = () => {
    const { cart, addtoCart, removeFromCart, removingItems, addingItems, cartLoading, isLoggedIn } = useAuthContext();
    const cartItems = Object.values(cart);
    const navigate = useNavigate();

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


    if (cartLoading) {
        return (
            <div className="fixed right-0 top-0 w-[178px] h-screen bg-gray-100 p-3 border-l border-gray-300 flex justify-center items-center">
                <ClipLoader size={28} color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="fixed right-0 top-0 w-[178px] h-screen bg-gray-100 p-3 border-l border-gray-300 flex flex-col">
            {/* Header stays fixed */}
            <h2 className="text-sm font-semibold mb-2">Your Cart</h2>

            {/* Scrollable cart items */}
            <div className="overflow-y-auto flex-1 pr-1">
                {cartItems.map((product) => (
                    <div
                        key={product._id}
                        className="mb-3 p-2 bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                        <div className="w-full h-20 flex justify-center items-center">
                            <img
                                src={product.productId?.images?.[0]}
                                alt={product.productId?.title}
                                className="max-h-16 object-contain"
                            />
                        </div>

                        <p className="text-xs font-semibold mt-1 truncate">
                            {product.productId?.title}
                        </p>
                        <p className="text-sm font-bold text-pink-800">
                            ₹{product.productId?.price}
                        </p>

                        <div className="flex items-center justify-center gap-2 mt-1">
                            {/* Remove */}
                            <Button
                                size="sm"
                                variant="outline-primary"
                                className="px-2 py-1 text-xs flex items-center justify-center"
                                onClick={() => handleRemoveFromCart(product._id)}
                                disabled={removingItems[product._id]}
                            >
                                {removingItems[product._id] ? (
                                    <ClipLoader size={14} color="#36d7b7" />
                                ) : (
                                    "-"
                                )}
                            </Button>

                            <span className="text-xs">{product.cartQuantity}</span>

                            {/* Add */}
                            <Button
                                size="sm"
                                variant="outline-primary"
                                className="px-2 py-1 text-xs flex items-center justify-center"
                                onClick={() => handleAddToCart(product._id)}
                                disabled={addingItems[product._id]}
                            >
                                {addingItems[product._id] ? (
                                    <ClipLoader size={14} color="#36d7b7" />
                                ) : (
                                    "+"
                                )}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { CartSideBar };
