"use client";
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCart";
import Header from "./HeaderComponents/ClientHeader";
import Basket from "./HeaderComponents/basket";
import OrderStatus from "../components/OrderComponent/OrderStatus";
import { useUser } from "../components/provider/UserProvider";
import { useRouter } from "next/navigation";
import CategoryComponent from "./CategoryComponent";
import { useCategoryContext } from "@/app/components/provider/CategoryProvider";
import axios from "axios";

export default function FoodClient() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  const { categories } = useCategoryContext();
  const [orderedFoods, setOrderedFoods] = useState<{ food: Food; quantity: number }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("orderedFoods");
    if (savedOrder) {
      setOrderedFoods(JSON.parse(savedOrder));
    }
  }, []);

  const allFoods = categories.flatMap((category) => category.foods || []);
  const displayedFoods = allFoods.slice(0, 4);
  const allFoodsCount = allFoods.length;

  const foodCountByCategory: Record<string, number> = {};
  categories?.forEach((cat) => {
    foodCountByCategory[cat._id] = cat.foods?.length || 0;
  });
  const addToOrder = (food: Food, quantity: number) => {
    if (!isAuthenticated) {
      alert("Please sign-up or login before an order.!");
      router.push("/Login");
      return;
    }

    setOrderedFoods((prev) => {
      const existingOrder = prev.find((item) => item.food._id === food._id);
      const updatedOrders = existingOrder
        ? prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        : [...prev, { food, quantity }];

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
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const res = await axios.get("http://localhost:3030/img/FoodClient");
        console.log("Full response:", res);
        if (res.data && res.data.url) {
          setCoverUrl(res.data.url);
        } else {
          console.error("Unexpected response structure:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch cover image:", error);
      }
    };

    fetchCover();
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">
      <Header toggleSidebar={toggleSidebar} orderedFoodsCount={orderedFoods.length} />
      <div className="max-w-[1200px] m-auto h-[300px] overflow-hidden rounded-md shadow-md">
        {coverUrl ? (
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <p className="text-center text-gray-500 mt-28">Loading image...</p>
        )}
      </div>
      <CategoryComponent />
      <div className="p-4 max-w-[1000px] w-full m-auto rounded-2xl flex gap-6 relative">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Foods by Category</h2>
          <div className="flex justify-between items-center cursor-pointer"
            onClick={() => router.push("/allDishes")}>
            <h3 className="text-lg font-semibold mt-4 mb-2">All of Dishes ({allFoodsCount})</h3>
            <h3>See More</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedFoods.map((food) => (
              <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
            ))}
          </div>
          {categories.map((category) => (
            <div key={category._id}>
              <h3 className="text-lg font-semibold mt-4 mb-2">
                {category.categoryName} ({foodCountByCategory[category._id]})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.foods?.map((food) => (
                  <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <Basket
          orderedFoods={orderedFoods}
          toggleSidebar={toggleSidebar}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          isOpen={isOpen}
          setOrderedFoods={setOrderedFoods}
          setOrderStatus={setOrderStatus}
          orderStatus={orderStatus}
        />
      )
      }
      <OrderStatus status={orderStatus} onClose={() => setOrderStatus("")} />
    </div >
  );
}
