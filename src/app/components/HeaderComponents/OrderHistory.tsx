"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "../provider/UserProvider";
import axios from "axios";
import { useOrderSidebar } from "../provider/OrderSideBar";
const OrderHistory = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { isOpen, currentView, closeSidebar } = useOrderSidebar();
    useEffect(() => {
        if (!user || !user.email) {
            setError("");
            return;
        }
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.post("http://localhost:3030/order/cli",
                    {
                        email: user.email
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user.token}`,
                        }
                    });

                if (response.data.success) {
                    setOrders(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("error.");
            }
        };
        fetchOrderHistory();
    }, [user]);

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("mn-MN", options);
    };
    return (
        <div className="order-history-container w-full h-full px-3 py-4">
            <h2 className="text-xl font-bold mb-4">Order List & History</h2>
            {error && <p className="text-red-500 font-medium">{error}</p>}
            {orders.length === 0 ? (
                <p className="text-center text-gray-500"> No order.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white shadow-md rounded-2xl p-5 transition-transform transform hover:scale-[1.01]"
                        >
                            <div className="mb-3">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Order № <span className="p-4">{order._id}</span>
                                </h3>
                                <p className="flex items-center gap-2 text-sm font-medium">
                                    Status:
                                    <span
                                        className={`status-badge px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse ${order.orderStatus === 'delivered'
                                            ? 'bg-green-500'
                                            : order.orderStatus === 'pending'
                                                ? 'bg-yellow-500'
                                                : 'bg-blue-500'
                                            }`}
                                    >
                                        {order.orderStatus.toUpperCase()}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Address: {order.address} | Phone: {order.phone}
                                </p>
                                <p className="text-sm text-gray-500">Date: {formatDate(order.createdAt)}</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-700 mb-2">Order Items:</h4>
                                <ul className="space-y-1">
                                    {order.foodList.map((food: any, idx: number) => (
                                        <li key={idx} className="text-sm text-gray-800">
                                            {food.foodName} <span className="font-semibold">x{food.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-right mt-3 font-semibold text-lg text-green-600">
                                    Total: {order.orderTotal.toLocaleString()} ₮
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default OrderHistory;
