"use client";
import React, { useState } from "react";
import QuantityControl from "./QuantityControl";

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
  setOrderedFoods: React.Dispatch<
    React.SetStateAction<{ food: Food; quantity: number }[]>
  >;
}

const OrderCards: React.FC<OrderCardsProps> = ({
  orderedFoods,
  setOrderedFoods,
}) => {
  const updateQuantity = (foodId: string, newQuantity: number) => {
    setOrderedFoods((prevFoods) =>
      prevFoods.map((item) =>
        item.food._id === foodId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = orderedFoods.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  return (
    <div className="mt-6 p-4 border border-gray-300 shadow-lg rounded-xl bg-white">
      <h3 className="text-lg font-bold mb-4">Your Order</h3>
      {orderedFoods.map(({ food, quantity }) => (
        <div key={food._id} className="flex w-[100%] max-w-[400px]">
          <div className="flex justify-between items-center mb-2 border-b pb-2">
            {food.image && typeof food.image === "string" && (
              <img
                src={food.image}
                alt={food.foodName}
                className="h-full w-[40%] object-cover rounded-lg"
              />
            )}
            <div>
              <p className="text-[14px] w-[100%] mx-2">{food.foodName}</p>
              <p className="text-[12px] mx-2">{food.ingredients}</p>
              <div className="flex justify-between">
                <QuantityControl
                  quantity={quantity}
                  setQuantity={(newQuantity) =>
                    updateQuantity(food._id, newQuantity)
                  }
                />
                <p className="text-lg font-semibold">₮{food.price}</p>
              </div>
            </div>
          </div>
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
