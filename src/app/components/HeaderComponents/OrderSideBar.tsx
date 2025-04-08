"use client";
import React, { useEffect, useState } from "react";
import Basket from "./basket";
import { useUser } from "../provider/UserProvider";
import { useRouter } from "next/navigation";
import OrderHistory from "./OrderHistory";
import { useOrderSidebar } from "../provider/OrderSideBar";

type Food = {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
};

type OrderedFood = {
    food: Food;
    quantity: number;
};

type OrderSidebarProps = {
    orderedFoods: OrderedFood[];
    setOrderedFoods: React.Dispatch<React.SetStateAction<OrderedFood[]>>;
};

const OrderSidebar: React.FC<OrderSidebarProps> = ({ orderedFoods, setOrderedFoods }) => {
    const { isAuthenticated } = useUser();
    const router = useRouter();
    const { isOpen, toggleSidebar, closeSidebar } = useOrderSidebar();
    const [activeTab, setActiveTab] = useState<"basket" | "orderHistory">("basket");
    const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");


    // Effect to sync ordered foods with localStorage
    useEffect(() => {
        const savedOrder = localStorage.getItem("orderedFoods");
        if (savedOrder) {
            try {
                const parsedOrder = JSON.parse(savedOrder);
                console.log("Loaded saved order:", parsedOrder);
                setOrderedFoods(parsedOrder);
            } catch (error) {
                console.error("Failed to parse saved order:", error);
                localStorage.removeItem("orderedFoods");
            }
        }
    }, [setOrderedFoods]);

    const handleUpdateQuantity = (foodId: string, newQuantity: number) => {
        const updatedOrders = orderedFoods.map((item) =>
            item.food._id === foodId ? { ...item, quantity: newQuantity } : item
        );
        setOrderedFoods(updatedOrders);
        localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
        console.log("Updated orders:", updatedOrders);
    };

    const handleRemoveItem = (index: number) => {
        const updatedOrders = orderedFoods.filter((_, i) => i !== index);
        setOrderedFoods(updatedOrders);
        localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
        console.log("Removed item, updated orders:", updatedOrders);
    };

    return (
        <div
            className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
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
                        orderedFoods={orderedFoods}
                        toggleSidebar={closeSidebar}
                        updateQuantity={handleUpdateQuantity}
                        removeItem={handleRemoveItem}
                        isOpen={isOpen}
                        setOrderStatus={setOrderStatus}
                        orderStatus={orderStatus}
                        setOrderedFoods={setOrderedFoods}
                    />
                ) : (
                    <OrderHistory />
                )}
            </div>
        </div>
    );
};

export default OrderSidebar;


