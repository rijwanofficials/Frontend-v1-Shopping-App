import { useState } from "react";
import { useAuthContext } from "../Context/AppContext";
import AddressPage from "./AddressPage";
import { Button } from "../components/ui/button";

const CheckoutPage = () => {
    const { cart, cartLoading, handleCheckout, placingOrder } = useAuthContext();

    const [address, setAddress] = useState(null);
    const [addressSaved, setAddressSaved] = useState(false);

    // Handle Address Submission
    const handleAddressSubmit = (formData) => {
        setAddress(formData);
        setAddressSaved(true);
    };

    // Place Order
    const handlePlaceOrderClick = async () => {
        if (!addressSaved || !address) {
            alert("Please provide your address first.");
            return;
        }
        await handleCheckout(address);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Step 1: Address Section */}
            {!addressSaved && <AddressPage onSubmit={handleAddressSubmit} />}

            {/* Step 2: Show Saved Address */}
            {addressSaved && (
                <div className="mt-4 p-3 border rounded-md bg-gray-50 shadow-sm">
                    <h3 className="font-semibold mb-1">Shipping Address</h3>
                    <p>{address.fullName}</p>
                    <p>{address.phone}</p>
                    <p>
                        {address.street}, {address.city}, {address.state} - {address.zip}
                    </p>
                    <p>{address.country}</p>
                </div>
            )}

            {/* 🔹 Order Summary (Always Visible) */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

                {cartLoading ? (
                    <ul className="space-y-2 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex justify-between border-b pb-2">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-16"></div>
                            </li>
                        ))}
                    </ul>
                ) : !cart || cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-2">
                            {cart.map((item, index) => (
                                <li key={index} className="flex justify-between border-b pb-2">
                                    <span>{item.productId.title} x {item.cartQuantity}</span>
                                    <span>₹{item.productId.price * item.cartQuantity}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Grand Total */}
                        <div className="flex justify-between mt-4 font-bold text-lg">
                            <span>Total</span>
                            <span>
                                ₹{cart.reduce(
                                    (sum, item) => sum + item.productId.price * item.cartQuantity,
                                    0
                                )}
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* Step 3: Place Order Button (only after address is saved) */}
            {addressSaved && (
                <div className="mt-6 flex justify-center items-center">
                    <Button
                        onClick={handlePlaceOrderClick}
                        disabled={placingOrder || !cart || cart.length === 0}
                    >
                        {placingOrder ? "Placing Order..." : "Place Order"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export { CheckoutPage };
