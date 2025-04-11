"use client";
import React, { useState } from "react";
import Basket from "./basket";
import OrderHistory from "./OrderHistory";
import { useOrderSidebar } from "../provider/OrderSideBar";

interface OrderSidebarProps {
    setOrderStatus: (status: "success" | "error" | "") => void;
    orderStatus: "success" | "error" | "";
}

const OrderSidebar: React.FC<OrderSidebarProps> = ({ setOrderStatus, orderStatus }) => {
    const { isOpen, closeSidebar } = useOrderSidebar();
    const [activeTab, setActiveTab] = useState<"basket" | "orderHistory">("basket");

    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex border-b">
                <button
                    onClick={() => setActiveTab("basket")}
                    className={`flex-1 px-4 py-2 font-medium ${activeTab === "basket" ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    My Cart
                </button>
                <button
                    onClick={() => setActiveTab("orderHistory")}
                    className={`flex-1 px-4 py-2 font-medium ${activeTab === "orderHistory" ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    My Orders
                </button>
            </div>

            <div className="h-full overflow-y-auto p-4">
                {activeTab === "basket" ? (
                    <Basket
                        toggleSidebar={closeSidebar}
                        isOpen={isOpen}
                        setOrderStatus={setOrderStatus}
                        orderStatus={orderStatus}
                    />
                ) : (
                    <OrderHistory />
                )}
            </div>
        </div>
    );
};

export default OrderSidebar;
