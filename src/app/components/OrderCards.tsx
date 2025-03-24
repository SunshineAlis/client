"use client";
import React from "react";


type Food = {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
};

interface OrderCardsProps {
    orderedFoods: { food: Food; quantity: number }[];
}

const OrderCards: React.FC<OrderCardsProps> = ({ orderedFoods }) => {
    const totalPrice = orderedFoods.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

    return (
        <div className="mt-6 p-4 border border-gray-300 shadow-lg rounded-xl bg-white">
            <h3 className="text-lg font-bold mb-4">Your Order</h3>
            {orderedFoods.map(({ food, quantity }) => (
                <div key={food._id} className="flex justify-between items-center mb-2 border-b pb-2">
                    <span className="text-lg">{food.foodName} (x{quantity})</span>
                    <span className="text-lg font-semibold">₮{food.price * quantity}</span>
                </div>
            ))}

            <h4 className="text-xl font-bold mt-4">Total: ₮{totalPrice}</h4>

            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                Submit Order
            </button>
        </div>
    );
};

export default OrderCards;
