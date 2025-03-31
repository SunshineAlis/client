import React, { useState } from "react";

type Food = {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
};

type ModalProps = {
    food: Food;
    isOpen: boolean;
    onClose: () => void;
    addToOrder: (food: Food, quantity: number) => void;
};

const AddToCardsModal: React.FC<ModalProps> = ({ food, isOpen, onClose, addToOrder }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] max-h-[90vh] overflow-auto relative">
                <button className="absolute top-2 right-3 text-gray-600 text-xl" onClick={onClose}>
                    ✖
                </button>

                {/* Зураг */}
                {food.image && typeof food.image === "string" && (
                    <img
                        src={food.image}
                        alt={food.foodName}
                        className="w-full h-[40vh] object-cover rounded-md mb-2"
                    />
                )}

                <h2 className="text-xl font-bold">{food.foodName}</h2>
                <p className="text-gray-600 mt-2">{food.ingredients}</p>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-gray-700 font-semibold">Price: {food.price}₮</p>
                    <div className="flex items-center">
                        <button className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-l-md" onClick={decreaseQuantity}>-</button>
                        <span className="px-4 text-lg font-semibold">{quantity}</span>
                        <button className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-r-md" onClick={increaseQuantity}>+</button>
                    </div>
                </div>

                <p className="text-right text-xl font-bold text-red-600 mt-4">
                    Total: {food.price * quantity}₮
                </p>

                <button
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => { addToOrder(food, quantity); onClose(); }}
                >
                    Add to Order List
                </button>
            </div>
        </div>
    );
};


export default AddToCardsModal;
