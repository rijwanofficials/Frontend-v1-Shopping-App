import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../Context/AppContext";
import Button from "../components/ui/button";
import { ClipLoader } from "react-spinners"; // <-- import loader

const CartPage = () => {
    const { cart, isLoggedIn, getCartItems } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // <-- loader state

    const goToAddressPage = async () => {
        if (!isLoggedIn) {
            navigate("/login?redirect=/address");
            return;
        }

        setLoading(true); // <-- show loader
        await getCartItems();

        const cartData = cart.map(item => ({
            id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            quantity: item.cartQuantity,
            image: item.productId.images?.[0],
        }));

        navigate("/address", { state: { cart: cartData } });
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-fit bg-gray-50">
            <main className="flex-1 flex justify-center px-4 sm:px-6 lg:px-8 mt-6">
                <div className="w-full max-w-2xl flex flex-col bg-white/10 shadow-md rounded-lg transition-all duration-300">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mt-6 mb-4">
                        🛒 Your Cart
                    </h1>

                    {cart.length === 0 ? (
                        <p className="text-center text-gray-700 text-lg py-8">
                            Your cart is empty
                        </p>
                    ) : (
                        <ul
                            className={`flex flex-col gap-4 px-6 py-4 ${cart.length > 4
                                    ? "overflow-y-auto max-h-[70vh]"
                                    : ""
                                }`}
                        >
                            {cart.map((item) => (
                                <li
                                    key={item._id}
                                    className="flex items-center gap-4 bg-white rounded-md shadow-sm p-4"
                                >
                                    <img
                                        src={item.productId?.images?.[0]}
                                        alt={item.productId?.title}
                                        className="w-20 h-20 object-cover rounded-md border border-gray-200"
                                    />

                                    <div className="flex flex-col flex-1">
                                        <h2 className="text-lg font-semibold text-blue-600 line-clamp-1">
                                            {item.productId?.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {item.productId?.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-blue-600 font-bold">
                                                ₹{item.productId?.price}
                                            </span>
                                            <span className="text-gray-700 text-sm">
                                                Qty: {item.cartQuantity}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>

            {cart.length > 0 && (
                <div className="flex justify-center items-center mt-4">
                    <Button onClick={goToAddressPage} disabled={loading}>
                        {loading ? <ClipLoader size={20} color="#fff" /> : "Checkout"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
