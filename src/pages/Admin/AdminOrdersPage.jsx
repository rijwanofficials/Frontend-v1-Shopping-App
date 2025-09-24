import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ShowErrorToast } from "../../utils/ToastMessageHelper";

const AdminOrdersPage = () => {
  const [adminOrders, setAdminOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admins/orders/`,
        { method: "GET", credentials: "include" }
      );
      const result = await response.json();
      if (response.ok) {
        setAdminOrders(result.orders);
      } else {
        ShowErrorToast(result.message || "Failed to fetch orders!");
      }
    } catch (err) {
      ShowErrorToast(`Error fetching orders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} loading={loading} />
      </div>
    );
  }

  if (!adminOrders || adminOrders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">All Orders</h1>

      <div className="flex flex-col gap-6">
        {adminOrders.map((order) => {
          const { _id, address, products, createdAt, userId } = order;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row border-2 border-amber-600 rounded-xl shadow-md hover:shadow-lg transition-transform p-4 gap-4 cursor-pointer"
            >
              {/* Left: Order Details */}
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="font-bold text-lg text-fuchsia-500 line-clamp-1">
                  Order ID: {_id}
                </h2>
                <p><strong>User ID:</strong> {userId}</p>
                <p><strong>Customer:</strong> {address.fullName}</p>
                <p><strong>Phone:</strong> {address.phoneNumber}</p>
                <p><strong>Date:</strong> {new Date(createdAt).toLocaleDateString()}</p>

                <div className="mt-2">
                  <strong>Shipping Address:</strong>
                  <p>
                    {address.street}, {address.city}, {address.state} - {address.zipCode}, {address.country}
                  </p>
                </div>
              </div>

              {/* Right: Products List */}
              <div className="flex-1 flex flex-col gap-2">
                <strong>Products:</strong>
                <ul className="list-disc list-inside">
                  {products.map((p) => {
                    const name = p.product?.title || "Product not available";
                    const price = p.product?.price || p.price || 0;
                    return (
                      <li key={p._id}>
                        {name} — Qty: {p.cartQuantity} — ₹{price.toLocaleString()}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { AdminOrdersPage };
