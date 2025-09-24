import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../Context/AppContext";
import Button from "../components/ui/button";

const CheckoutPage = () => {
  const { cart, cartLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Receive address from navigation state
  const address = location.state?.address;

  // Proceed to Payment Page
  const handleProceedToPayment = () => {
    if (address && cart && cart.length > 0) {
      navigate("/payment", { state: { address, cart } });
    }
  };

  if (!address) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">No address found. Please go back and enter your shipping details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Show Address */}
      <div className="mt-4 p-3 border rounded-md bg-gray-50 shadow-sm">
        <h3 className="font-semibold mb-1">Shipping Address</h3>
        <p>{address.fullName}</p>
        <p>{address.countryCode} {address.phoneNumber}</p>
        <p>
          {address.street}, {address.city}, {address.region} - {address.zipCode}
        </p>
        <p>{address.country}</p>
      </div>

      {/* Order Summary */}
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

      {/* Proceed to Payment */}
      {cart && cart.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleProceedToPayment}
            className=" bg-blue-600 hover:bg-blue-700"
          >
            Proceed to Pay
          </Button>
        </div>
      )}
    </div>
  );
};

export { CheckoutPage };
