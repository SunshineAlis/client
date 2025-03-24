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

type FoodProps = {
    food: Food;
    addToOrder?: (food: Food) => void;
};

const FoodCard: React.FC<FoodProps> = ({ food, addToOrder }) => {


    return (
        <div className="relative border border-gray-300 shadow-lg flex flex-col justify-center items-center rounded-xl bg-white p-4 transition-transform hover:scale-105">
            {food.image && typeof food.image === "string" && (
                <img
                    src={food.image}
                    alt={food.foodName}
                    className="h-36 w-[90%] object-cover rounded-lg"
                />
            )}
            <button
                className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-white text-2xl text-black font-semibold transition-colors hover:bg-red-600"
                onClick={() => addToOrder && addToOrder(food)}
            >
                +
            </button>
            <div className="flex justify-between items-center mt-3 w-full px-2">
                <span className="text-red-500 font-bold truncate w-[70%] overflow-hidden hover:whitespace-normal hover:bg-white hover:shadow-md px-2 py-1 rounded-md">
                    {food.foodName}
                </span>
                <span className="text-gray-700 font-semibold">{food.price}₮</span>
            </div>
            <p className="font-bold w-full mt-2 px-2">
                Ingredients:
                <span className="font-normal block text-gray-600 h-30 text-sm line-clamp-2 hover:line-clamp-none hover:bg-gray-100 px-2 py-1 rounded-md">
                    {food.ingredients}
                </span>
            </p>
        </div >
    );
};

export default FoodCard;