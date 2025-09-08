import { useState } from "react";
import { useAuthContext } from "../Context/AppContext";
import AddressPage from "./AddressPage";
import { Button } from "../components/ui/button";


const CheckoutPage = () => {
    const { cart, handleCheckout, placingOrder } = useAuthContext();
    const cartItems = Object.values(cart);
    const [address, setAddress] = useState(null);

    const handleAddressSubmit = (formData) => {
        setAddress(formData);
    };

    const handlePlaceOrder = async () => {
        if (!address) {
            alert("Please provide your address first.");
            return;
        }

        await handleCheckout(address);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <AddressPage onSubmit={handleAddressSubmit} />

            <div className="mt-8 bg-white shadow rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
                {cartItems.map((product) => (
                    <div key={product.productId._id} className="flex justify-between mb-2">
                        <span>{product.productId.title} (x{product.cartQuantity})</span>
                        <span>₹{product.productId.price * product.cartQuantity}</span>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center items-center">
                <Button onClick={handlePlaceOrder} disabled={placingOrder}>
                    {placingOrder ? "Placing Order..." : "Place Order"}
                </Button>
            </div>
        </div>
    );
};

export { CheckoutPage };
