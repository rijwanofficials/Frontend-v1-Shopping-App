import { useLocation } from "react-router";
import { useAuthContext } from "../Context/AppContext";
import Button from "../components/ui/button";
import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { ShowErrorToast, ShowSuccessToast } from "../utils/ToastMessageHelper";


const CheckoutPage = () => {
  const { cart, cartLoading, handleCheckout, placingOrder } = useAuthContext();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Get address from navigation state
  const address = location.state?.address;

  if (!address) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">No address found. Please go back and enter your shipping details.</p>
      </div>
    );
  }

  const handleSendOrder = async () => {
    if (!cart || cart.length === 0) return;

    setLoading(true);
    try {
    const paymentSessionId = await handleCheckout(address);
if (paymentSessionId) {
      console.log("paymentSessionId:", paymentSessionId);
      // Redirect tofunction Checkout() {
    let cashfree;
    var initializeSDK = async function () {          
        cashfree = await load({
            mode: "sandbox"
        });
    }
    await initializeSDK(); 

    
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((result) => {
            if(result.error){
                // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                console.log(result.error);
                ShowErrorToast("Payment failed. Please try again.");
            }
            if(result.redirect){
                // This will be true when the payment redirection page couldnt be opened in the same window
                // This is an exceptional case only when the page is opened inside an inAppBrowser
                // In this case the customer will be redirected to return url once payment is completed
                console.log("Payment will be redirected");

            }
            if(result.paymentDetails){
                // This will be called whenever the payment is completed irrespective of transaction status
                console.log("Payment has been completed, Check for Payment Status");
                console.log(result.paymentDetails.paymentMessage);
                ShowSuccessToast("Payment successful! Your order has been placed.");
            }
        });
    }    
  } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Show Address */}
      <div className="mt-4 p-3 border rounded-md bg-gray-50 shadow-sm">
        <h3 className="font-semibold mb-1">Shipping Address</h3>
        <p>{address.fullName}</p>
        <p>{address.countryCode} {address.phoneNumber}</p>
        <p>{address.street}, {address.city}, {address.region} - {address.zipCode}</p>
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
                ₹{cart.reduce((sum, item) => sum + item.productId.price * item.cartQuantity, 0)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Send Order Button */}
      {cart && cart.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSendOrder}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={loading || placingOrder}
          >
            {loading || placingOrder ? "Processing..." : "Proceed to Pay"}
          </Button>
        </div>
      )}
    </div>
  );
};

export { CheckoutPage };
