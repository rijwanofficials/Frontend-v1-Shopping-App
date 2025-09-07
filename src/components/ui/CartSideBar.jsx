import { useNavigate } from "react-router";
import { useAuthContext } from "../../Context/AppContext";
import { ShowErrorToast } from "../../utils/ToastMessageHelper";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";

const CartSideBar = () => {
    const {
        cart,
        addtoCart,
        removeFromCart,
        removingItems,
        addingItems,
        cartLoading,
        isLoggedIn,
    } = useAuthContext();

    const navigate = useNavigate();
    const cartItems = Object.values(cart);

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

    if (cartLoading) {
        return (
            <div className="fixed right-0 top-0 w-[178px] h-screen bg-gray-100 p-3 border-l border-gray-300 flex justify-center items-center">
                <ClipLoader size={28} color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="fixed right-0 top-0 w-[178px] h-screen bg-gray-100 p-3 border-l border-gray-300 flex flex-col">
            <h2 className="text-sm font-semibold mb-2">Your Cart</h2>

            <div className="overflow-y-auto flex-1 pr-1">
                {cartItems.length === 0 && (
                    <p className="text-xs text-center mt-3">Your cart is empty</p>
                )}
                {cartItems.map((product) => {
                    const productId = product.productId._id;

                    return (
                        <div

                            key={productId}
                            className="mb-3 p-2 bg-white rounded-md shadow-sm hover:shadow-md transition"
                        >
                            <div className="w-full h-20 flex justify-center items-center cursor-pointer"
                                onClick={() => handleViewProduct(productId)}

                            >
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
                                    disabled={addingItems[productId]}
                                >
                                    {addingItems[productId] ? (
                                        <ClipLoader size={14} color="#36d7b7" />
                                    ) : (
                                        "+"
                                    )}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { CartSideBar };
