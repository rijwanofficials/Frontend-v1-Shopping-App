import { useEffect, useState } from "react";

// Shimmer Skeleton matching your current UI
const OrderShimmer = () => {
    return (
        <div className="border border-gray-200 rounded-xl shadow-sm bg-white animate-pulse space-y-4">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center rounded-t-xl">
                <div>
                    <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div>
                    <div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-28"></div>
                </div>
            </div>

            {/* Order Items */}
            <div className="p-6 space-y-4">
                {[1, 2].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 border-b pb-4 last:border-none last:pb-0"
                    >
                        <div className="w-20 h-20 bg-gray-300 rounded border"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                    </div>
                ))}

                {/* Shipping Address */}
                <div className="mt-6 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getMyOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/orders/my-orders`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const result = await response.json();

            if (response.status === 200 && result.orders) {
                setOrders(result.orders);
            } else {
                alert("Failed to fetch orders!");
            }
        } catch (err) {
            alert(`Error fetching orders: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyOrders();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                My Orders
            </h2>

            {loading ? (
                <div className="space-y-6">
                    <OrderShimmer />
                    <OrderShimmer />
                    <OrderShimmer />
                </div>
            ) : orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
                        >
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center rounded-t-xl">
                                <div>
                                    <p className="text-sm text-gray-500">ORDER PLACED</p>
                                    <p className="font-medium text-gray-800">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">ORDER ID</p>
                                    <p className="font-medium text-gray-800">{order._id}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <ul className="space-y-6">
                                    {order.products.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-4 border-b pb-4 last:border-none last:pb-0"
                                        >
                                            <img
                                                src={item.product.thumbnail}
                                                alt={item.product.title}
                                                className="w-20 h-20 object-cover rounded border"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">
                                                    {item.product.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Qty: {item.cartQuantity}
                                                </p>
                                            </div>
                                            <p className="font-semibold text-green-600">
                                                ₹{item.price}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                {/* Shipping Address */}
                                <div className="mt-6 text-sm text-gray-700">
                                    <p className="font-medium text-gray-800 mb-1">
                                        Shipping Address
                                    </p>
                                    <p>
                                        {order.address.fullName}, {order.address.street},{" "}
                                        {order.address.city}, {order.address.state} -{" "}
                                        {order.address.zipCode}, {order.address.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export { MyOrders };
