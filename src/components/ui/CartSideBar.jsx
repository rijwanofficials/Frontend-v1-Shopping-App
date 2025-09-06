import { useAuthContext } from "../../Context/AppContext";
import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";

const CartSideBar = () => {
    const { cart, addtoCart, cartUpdating, cartLoading } = useAuthContext();
    const cartItems = Object.values(cart);

    const handleAddToCart = async (productId) => {
        await addtoCart(productId);
    };

    if (cartLoading) {
        return (
            <div className="bg-gray-100 p-3 border-l border-gray-300 w-[178px] flex justify-center items-center">
                <ClipLoader size={28} color="#36d7b7" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 p-3 border-l border-gray-300 w-[178px] overflow-y-auto relative">
            <h2 className="text-sm font-semibold mb-2">Your Cart</h2>
            {cartItems.map((product, index) => (
                <div
                    key={index}
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
                        <Button size="sm" variant="outline-primary" className="px-2 py-1 text-xs">
                            -
                        </Button>

                        <span className="text-xs">{product.cartQuantity}</span>

                        <Button
                            size="sm"
                            variant="outline-primary"
                            className="px-2 py-1 text-xs flex items-center justify-center"
                            onClick={() => handleAddToCart(product._id)}
                            disabled={cartUpdating}
                        >
                            {cartUpdating ? (
                                <ClipLoader size={14} color="#36d7b7" />
                            ) : (
                                "+"
                            )}
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { CartSideBar };
