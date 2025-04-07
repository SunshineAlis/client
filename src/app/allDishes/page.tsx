"use client";
import React, { useState } from "react";
import FoodCard from "../components/FoodCart";
import { useCategoryContext } from "../components/provider/CategoryProvider";
import { useUser } from "../components/provider/UserProvider";
import { useRouter } from "next/navigation";
export default function AllDishes() {
    const { isAuthenticated } = useUser();
    const router = useRouter();
    const { categories } = useCategoryContext();
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);

    const allFoods = categories.flatMap((category) => category.foods || []);
    const displayedFoods = allFoods;
    const allFoodsCount = allFoods.length;

    const addToOrder = (food: Food, quantity: number) => {
        if (!isAuthenticated) {
            alert("Please sign-up or login before an order.!");
            router.push("/Login");
            return;
        }
    }
    return (
        <div className="max-w-[1100px] w-full m-auto px-4">
            <h3 className="text-lg font-semibold mt-4 mb-2">
                All of Dishes ({allFoodsCount})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedFoods.map((food) => (
                    <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
                ))}
            </div>
        </div>
    );
}
