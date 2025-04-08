"use client";

import React, { useEffect, useState } from "react";
import Basket from "../components/HeaderComponents/basket";
import { useUser } from "../components/provider/UserProvider";
import { useRouter } from "next/navigation";
import { useCategoryContext } from "@/app/components/provider/CategoryProvider";
import OrderHistory from "../components/HeaderComponents/OrderHistory";

export default function Home() {
    const { isAuthenticated } = useUser();
    const router = useRouter();

    const { categories } = useCategoryContext();
    const [orderedFoods, setOrderedFoods] = useState<{ food: Food; quantity: number }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");
    const [currentView, setCurrentView] = useState<"basket" | "orderHistory">("basket");

    useEffect(() => {
        const savedOrder = localStorage.getItem("orderedFoods");
        if (savedOrder) {
            setOrderedFoods(JSON.parse(savedOrder));
        }
    }, []);

    const allFoods = categories.flatMap((category) => category.foods || []);
    const displayedFoods = allFoods.slice(0, 4);
    const allFoodsCount = allFoods.length;

    const foodCountByCategory: Record<string, number> = {};
    categories?.forEach((cat) => {
        foodCountByCategory[cat._id] = cat.foods?.length || 0;
    });

    const addToOrder = (food: Food, quantity: number) => {
        if (!isAuthenticated) {
            alert("Please sign-up or login before an order.");
            router.push("/Login");
            return;
        }

        setOrderedFoods((prev) => {
            const existingOrder = prev.find((item) => item.food._id === food._id);
            const updatedOrders = existingOrder
                ? prev.map((item) =>
                    item.food._id === food._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                : [...prev, { food, quantity }];

            localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
            return updatedOrders;
        });

        setIsOpen(true);
    };
    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };
    const updateQuantity = (foodId: string, newQuantity: number) => {
        setOrderedFoods((prev) => {
            const updatedOrders = prev.map((item) =>
                item.food._id === foodId ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    const removeItem = (index: number) => {
        setOrderedFoods((prev) => {
            const updatedOrders = prev.filter((_, idx) => idx !== index);
            localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    return (
        <div>
            <button onClick={() => {
                setCurrentView("basket");
                setIsOpen(true);
            }}>My Cart</button>

            <button onClick={() => {
                setCurrentView("orderHistory");
                setIsOpen(false);
            }}>My Order</button>

            {currentView === "basket" && isOpen && (
                <Basket
                    orderedFoods={orderedFoods}
                    toggleSidebar={() => setIsOpen(false)}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    isOpen={isOpen}
                    setOrderedFoods={setOrderedFoods}
                    setOrderStatus={setOrderStatus}
                    orderStatus={orderStatus}
                />
            )}

            {currentView === "orderHistory" && <OrderHistory />}
        </div>
    );
}
