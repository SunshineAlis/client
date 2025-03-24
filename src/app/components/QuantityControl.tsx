"use client";
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

type OrderCardsProps = {
  orderedFoods: { food: Food; quantity: number }[];
  setOrderedFoods: React.Dispatch<
    React.SetStateAction<{ food: Food; quantity: number }[]>
  >;
};
const QuantityControl: React.FC<{
  quantity: number;
  setQuantity: (quantity: number) => void;
}> = ({ quantity, setQuantity }) => {
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="w-5 h-5 px-4 py-4 bg-gray-200"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <p className="px-4">{quantity}</p>
      <button
        className="w-5 h-5 rounded-lg flex text-center justify-center px-4 py-4 bg-gray-200"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};
export default QuantityControl;
