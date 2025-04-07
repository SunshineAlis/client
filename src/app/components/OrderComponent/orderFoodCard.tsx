"use client";
import React from "react";

const OrderFoodCard: React.FC<OrderFoodProps> = ({ food }) => {
    return (
        <div className="relative border border-gray-300 shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-3 rounded-xl bg-white p-4 transition-transform hover:scale-105 w-full max-w-sm sm:max-w-full mx-auto">
            {food.image && typeof food.image === "string" && (
                <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-full sm:w-36 h-36 object-cover rounded-lg"
                />
            )}
            <div className="flex-1 w-full">
                <p className="text-red-500 font-bold truncate sm:truncate-0 text-base sm:text-lg mb-1">
                    {food.foodName}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 hover:line-clamp-none hover:bg-gray-100 px-2 py-1 rounded-md transition">
                    {food.ingredients}
                </p>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-700 font-semibold text-sm sm:text-base">
                        {food.price}₮
                    </span>
                </div>
            </div>
        </div>

    );
};

export default OrderFoodCard;