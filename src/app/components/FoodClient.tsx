import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import FoodCard from "./FoodCart";
import OrderList from "@/OrderCompenent/OrderListModal";
import Header from "./ClientHeader";
import Basket from "../components/basket";
import FoodCategory from "./FoodCategory";
import OrderStatus from "@/OrderCompenent/OrderStatus";
import SubmitOrder from "../components/SubmitOrder";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image?: string | null | File;
  categoryId?: string;
  imageUrl?: string;
};

type Category = {
  _id: string;
  categoryName: string;
  foods?: Food[];
};

type OrderItem = {
  food: string; // Or `Food` if you want to store the whole object
  quantity: number;
};

type Order = {
  totalPrice: number;
  foodOrderItems: OrderItem[];
};

export default function FoodClient() {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState<Category[]>([]);
  const [orderedFoods, setOrderedFoods] = useState<{ food: Food; quantity: number }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");

  useEffect(() => {
    const savedOrder = localStorage.getItem("orderedFoods");
    if (savedOrder) {
      setOrderedFoods(JSON.parse(savedOrder));
    }

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

  const allFoods = categoriesWithFoods.flatMap((category) => category.foods || []);

  const addToOrder = (food: Food, quantity: number) => {
    setOrderedFoods((prev) => {
      const existingOrder = prev.find((item) => item.food._id === food._id);
      let updatedOrders;

      if (existingOrder) {
        updatedOrders = prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedOrders = [...prev, { food, quantity }];
      }

      localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
      return updatedOrders;
    });

    setIsOpen(true);
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const updateQuantity = (foodId: string, newQuantity: number) => {
    setOrderedFoods((prev) => {
      const updatedOrders = prev.map((item) =>
        item.food._id === foodId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  const removeItem = (index: number) => {
    setOrderedFoods((prev) => {
      const updatedOrders = prev.filter((_, idx) => idx !== index);
      localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      <Header toggleSidebar={toggleSidebar} orderedFoodsCount={orderedFoods.length} />
      <FoodCategory />
      <div className="p-4 max-w-[1000px] w-full m-auto rounded-2xl flex gap-6 relative">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Foods by Category</h2>
          <h2>All of Dishes</h2>
          <div className="grid grid-cols-4 gap-2">
            {allFoods.map((food) => (
              <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
            ))}
          </div>

          {categoriesWithFoods.map((category) => (
            <div key={category._id}>
              <h3 className="text-lg font-semibold mt-4 mb-2">{category.categoryName}</h3>
              <div className="grid grid-cols-4 gap-2">
                {category.foods?.map((food) => (
                  <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <OrderList
          orderedFoods={orderedFoods}
          setOrderedFoods={setOrderedFoods}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {isOpen && (
        <Basket
          orderedFoods={orderedFoods}
          toggleSidebar={toggleSidebar}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          isOpen={isOpen}
          setOrderedFoods={setOrderedFoods} // 🆕 props дамжуулах
          setOrderStatus={setOrderStatus}   // 🆕 props дамжуулах
        />
      )}
      <OrderStatus status={orderStatus} onClose={() => setOrderStatus("")} />
    </div>
  );
}
