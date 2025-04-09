"use client";
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCart";
import ClientHeader from "./HeaderComponents/ClientHeader";
import OrderSidebar from "../components/HeaderComponents/OrderSideBar";
import OrderStatus from "../components/OrderComponent/OrderStatus";
import { useUser } from "../components/provider/UserProvider";
import { useRouter } from "next/navigation";
import CategoryComponent from "./CategoryComponent";
import { useCategoryContext } from "@/app/components/provider/CategoryProvider";
import { useOrderSidebar } from "../components/provider/OrderSideBar";
import page from "../page";
import { useCart } from "./provider/CartProvider";
const FoodClient: React.FC = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const { toggleSidebar } = useOrderSidebar();
  const { categories } = useCategoryContext();
  const [orderedFoods, setOrderedFoods] = useState<OrderedFood[]>([]);
  const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToOrder } = useCart();
  useEffect(() => {
    const loadSavedOrder = () => {
      const savedOrder = localStorage.getItem("orderedFoods");
      if (savedOrder) {
        try {
          setOrderedFoods(JSON.parse(savedOrder));
        } catch (error) {
          console.error("Failed to parse saved order:", error);
          localStorage.removeItem("orderedFoods");
        }
      }
    };
    loadSavedOrder();
  }, []);
  const handleAddToOrder = (food: Food, quantity: number) => {
    if (!isAuthenticated) {
      alert("Захиалга өгөхийн тулд нэвтэрнэ үү.");
      router.push("/Login");
      return;
    }
    addToOrder(food, quantity);
    toggleSidebar("basket");
  };
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const response = await fetch(`/api/covers?page=${page}`);
        const data = await response.json();
        if (data.length > 0) {
          setCoverUrl(data[0].secure_url);
        }
      } catch (error) {
        console.error("Error fetching cover image:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCover();
  }, [page]);

  const allFoods = categories.flatMap((category) => category.foods || []);
  const displayedFoods = allFoods.slice(0, 4);
  const foodCountByCategory = categories.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat._id] = cat.foods?.length || 0;
      return acc;
    },
    {}
  );
  const renderFoodCategories = () => (
    <div className="p-4 max-w-[1000px] w-full m-auto rounded-2xl flex gap-6 relative">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Foods by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              addToOrder={handleAddToOrder}
              quantity={orderedFoods.find(
                (item) => item.food._id === food._id
              )?.quantity || 0}
            />
          ))}
        </div>

        {categories.map((category) => (
          <div key={category._id}>
            <h3 className="text-lg font-semibold mt-4 mb-2">
              {category.categoryName} ({foodCountByCategory[category._id]})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.foods?.map((food) => (
                <FoodCard
                  key={food._id}
                  food={food}
                  addToOrder={handleAddToOrder}
                  quantity={orderedFoods.find(
                    (item) => item.food._id === food._id
                  )?.quantity || 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="bg-gray-100 min-h-screen">
      <ClientHeader orderedFoodsCount={orderedFoods.length} />
      <CategoryComponent />
      {renderFoodCategories()}
      <OrderSidebar
      />
      <OrderStatus
        status={orderStatus}
        onClose={() => setOrderStatus("")}
      />
    </div>
  );
}; export default FoodClient;
