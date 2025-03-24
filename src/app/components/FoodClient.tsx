import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import FoodCard from "./FoodCart";
import OrderCards from "./OrderCards"; // 

type Category = {
  _id: string;
  categoryName: string;
  foods?: Food[];
};

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image?: string | null | File;
  categoryId?: string;
  imageUrl?: string;
};

export default function FoodClient() {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState<Category[]>([]);
  const [orderedFoods, setOrderedFoods] = useState<{ food: Food; quantity: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesWithFoods = async () => {
      try {
        const { data } = await axios.get("http://localhost:3030/category");
        const categories = data.data;

        const categoriesData = await Promise.all(
          categories.map(async (category: Category) => {
            try {
              const { data } = await axios.get<{ foods: Food[] }>(
                `http://localhost:3030/foods/${category._id}/foods`
              );
              return { ...category, foods: data.foods || [] };
            } catch (error) {
              console.error(`Error fetching foods for ${category.categoryName}:`, error);
              return { ...category, foods: [] };
            }
          })
        );
        setCategoriesWithFoods(categoriesData);
      } catch (error) {
        console.error("Error fetching categories with foods:", error);
      }
    };
    fetchCategoriesWithFoods();
  }, []);

  if (categoriesWithFoods.length === 0) {
    return <p className="text-center text-gray-500">Loading foods...</p>;
  }

  const allFoods = categoriesWithFoods.flatMap((category) => category.foods || []);

  const addToOrder = (food: Food) => {
    setOrderedFoods((prev) => {
      const existingOrder = prev.find((item) => item.food._id === food._id);
      if (existingOrder) {
        return prev.map((item) =>
          item.food._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { food, quantity: 1 }];
      }
    });
  };

  return (
    <div className="p-4 bg-gray-100 max-w-[1200px] w-full m-auto rounded-2xl flex gap-6">

      <div className="w-3/4">
        <h2 className="text-xl font-bold mb-4">Foods by Category</h2>
        <div className="grid grid-cols-4 gap-2">
          {allFoods.map((food) => (
            <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
          ))}
        </div>
      </div>

      {orderedFoods.length > 0 && (
        <div className="w-1/4">
          <OrderCards orderedFoods={orderedFoods} />
        </div>
      )}
    </div>
  );

}
