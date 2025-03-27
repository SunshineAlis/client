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

type OrderFoodProps = {
    food: Food;

};

const OrderFoodCard: React.FC<OrderFoodProps> = ({ food }) => {


    return (
        <div className="relative border border-gray-300 shadow-lg flex flex-col justify-center items-center rounded-xl bg-white p-4 transition-transform hover:scale-105">
            <div className="flex">
                {food.image && typeof food.image === "string" && (
                    <img
                        src={food.image}
                        alt={food.foodName}
                        className="h-36 w-[90%] object-cover rounded-lg"
                    />
                )}


                <div>
                    <p className="text-red-500 font-bold truncate w-[70%] overflow-hidden hover:whitespace-normal hover:bg-white hover:shadow-md px-2 py-1 rounded-md">
                        {food.foodName}
                    </p>
                    <p className="font-normal block text-gray-600 h-30 text-sm line-clamp-2 hover:line-clamp-none hover:bg-gray-100 px-2 py-1 rounded-md">
                        {food.ingredients}
                    </p>
                    <div className=" flex justify-between">
                        <span className="text-gray-700 font-semibold">{food.price}₮</span>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OrderFoodCard;