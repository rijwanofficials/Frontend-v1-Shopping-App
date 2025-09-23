import { useEffect, useState } from "react";
import { ShowErrorToast } from "../../utils/ToastMessageHelper";
import { ClipLoader } from "react-spinners";

const AdminOrdersPage = () => {
  const [adminOrders, setAdminOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admins/orders/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setAdminOrders(result.orders);
      } else {
        ShowErrorToast("Failed to fetch orders!");
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
        <ClipLoader size={60}  loading={loading} />
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold m-4 text-blue-700">
        All Orders of Your App
      </h1>
      {adminOrders.map((order) => {
        const { _id, address, products, createdAt, userId } = order;

        return (
          <div
            key={_id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2">Order ID: {_id}</h2>
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

            <div className="mt-2">
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
  );
};

export { AdminOrdersPage };
