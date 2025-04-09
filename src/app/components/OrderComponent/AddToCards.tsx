"use client";
import React, { useState } from "react";
import { useCart } from "../provider/CartProvider"
import { useOrderSidebar } from "../provider/OrderSideBar";
const AddToCardsModal: React.FC<AddModalProps> = ({ food, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { toggleSidebar } = useOrderSidebar();
    const { addToOrder } = useCart();
    function increaseQuantity() {
        return setQuantity(quantity + 1);
    }
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 px-2">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md md:max-w-[60%] lg:max-w-[40%] max-h-[90vh] overflow-auto relative">
                <button
                    className="absolute top-2 right-3 text-gray-600 text-xl"
                    onClick={onClose}
                >
                    ✖
                </button>
                {food.image && typeof food.image === "string" && (
                    <img
                        src={food.image}
                        alt={food.foodName}
                        className="w-full h-[30vh] sm:h-[35vh] md:h-[40vh] object-cover rounded-md mb-2"
                    />
                )}

                <h2 className="text-lg sm:text-xl font-bold break-words">{food.foodName}</h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base break-words">
                    {food.ingredients}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">
                        Price: {food.price}₮
                    </p>
                    <div className="flex items-center justify-center">
                        <button
                            className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-l-md"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>
                        <span className="px-4 text-lg font-semibold">{quantity}</span>
                        <button
                            className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-r-md"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>
                    </div>
                </div>
                <p className="text-right text-lg sm:text-xl font-bold text-red-600 mt-4">
                    Total: {food.price * quantity}₮
                </p>
                <button
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition text-sm sm:text-base"
                    onClick={() => {
                        addToOrder(food, quantity);
                        onClose();
                        toggleSidebar("basket");
                    }}
                >
                    Add to Order List
                </button>
            </div>
        </div>

    );
};


export default AddToCardsModal;
