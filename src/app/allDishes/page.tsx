"use client";
import React, { useState, useEffect } from "react";
import FoodCard from "../components/FoodCart";
import { useUser } from "../components/provider/UserProvider";
import { useRouter } from "next/navigation";
import { useCategoryContext } from "@/app/components/provider/CategoryProvider";
import { useOrderSidebar } from "../components/provider/OrderSideBar";
import ClientHeader from "../components/HeaderComponents/ClientHeader";
import Footer from "../components/Footer";
import { pages } from "next/dist/build/templates/app-page";
export default function AllDishes() {

    const { isAuthenticated } = useUser();
    const router = useRouter();
    const { categories } = useCategoryContext();
    const [orderedFoods, setOrderedFoods] = useState<OrderedFood[]>([]);
    const allFoods = categories.flatMap((category) => category.foods || []);
    const displayedFoods = allFoods;
    const allFoodsCount = allFoods.length;
    const { toggleSidebar } = useOrderSidebar();
    const addToOrder = (food: Food, quantity: number) => {
        if (!isAuthenticated) {
            alert("Захиалга өгөхийн тулд нэвтэрнэ үү.");
            router.push("/Login");
            return;
        }
        setOrderedFoods((prev) => {
            const existing = prev.find((item) => item.food._id === food._id);
            const updated = existing
                ? prev.map((item) =>
                    item.food._id === food._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                : [...prev, { food, quantity }];

            localStorage.setItem("orderedFoods", JSON.stringify(updated));
            return updated;
        });
        toggleSidebar("basket");
    };
    useEffect(() => {
        const loadSavedOrder = () => {
            const savedOrder = localStorage.getItem("orderedFoods");
            if (savedOrder) {
                try {
                    setOrderedFoods(JSON.parse(savedOrder));
                } catch (error) {
                    console.error("Failed to parse saved order:", error);
                    localStorage.removeItem("orderedFoods");
                }
            }
        };
        loadSavedOrder();
    }, []);
    return (
        <div className="max-w-[1100px] w-full m-auto px-4">
            <ClientHeader orderedFoodsCount={orderedFoods.length} />
            <h3 className="text-lg font-semibold mt-4 mb-2">
                All of Dishes ({allFoodsCount})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedFoods.map((food) => (
                    <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
                ))}
            </div>
            <Footer />
        </div>
    );
}

