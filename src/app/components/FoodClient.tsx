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
import axios from "axios"
import page from "../page";
type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image?: string | null | File;
  categoryId?: string;
  imageUrl?: string;
};

type OrderedFood = {
  food: Food;
  quantity: number;

};

const FoodClient: React.FC = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const { toggleSidebar } = useOrderSidebar();
  const { categories } = useCategoryContext();
  const [orderedFoods, setOrderedFoods] = useState<OrderedFood[]>([]);
  const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const response = await fetch(`/api/covers?page=${page}`);
        const data = await response.json();
        if (data.length > 0) {
          setCoverUrl(data[0].secure_url);
        }
      } catch (error) {
        console.error('Error fetching cover image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, [page]);

  // useEffect(() => {
  //   const fetchCover = async () => {
  //     try {
  //       setIsLoadingCover(true);
  //       const res = await axios.post("http://localhost:3030/img/FoodClient");
  //       if (res.data?.url) {
  //         setCoverUrl(res.data.url);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch cover image:", error);
  //     } finally {
  //       setIsLoadingCover(false);
  //     }
  //   };
  // }, []);
  // Calculate food counts
  const allFoods = categories.flatMap((category) => category.foods || []);
  const displayedFoods = allFoods.slice(0, 4);
  const foodCountByCategory = categories.reduce<Record<string, number>>(
    (acc, cat) => {
      acc[cat._id] = cat.foods?.length || 0;
      return acc;
    }, {}
  );

  const addToOrder = (food: Food, quantity: number) => {
    if (!isAuthenticated) {
      alert("Захиалга өгөхийн тулд нэвтэрнэ үү.");
      router.push("/Login");
      return;
    }
    setOrderedFoods((prev) => {
      const existing = prev.find((item) => item.food._id === food._id);
      const updated = existing
        ? prev.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        : [...prev, { food, quantity }];

      localStorage.setItem("orderedFoods", JSON.stringify(updated));
      return updated;
    });
    toggleSidebar("basket");
  };
  const renderCoverImage = () => (
    <div className="max-w-[1200px] m-auto h-[300px] overflow-hidden rounded-md shadow-md bg-gray-200">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Loading image...</p>
        </div>
      ) : coverUrl ? (
        <img
          src={coverUrl}
          alt="Food cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No cover image available</p>
        </div>
      )}
    </div>
  );
  // Render cover image
  // const renderCoverImage = () => (
  //   <div className="max-w-[1200px] m-auto h-[300px] overflow-hidden rounded-md shadow-md bg-gray-200">
  //     {isLoadingCover ? (
  //       <div className="h-full flex items-center justify-center">
  //         <p className="text-gray-500">Loading image...</p>
  //       </div>
  //     ) : coverUrl ? (
  //       <img
  //         src={coverUrl}
  //         alt="Food cover"
  //         className="w-full h-full object-cover"
  //       />
  //     ) : (
  //       <div className="h-full flex items-center justify-center">
  //         <p className="text-gray-500">No cover image available</p>
  //       </div>
  //     )}
  //   </div>
  // );

  const renderFoodCategories = () => (
    <div className="p-4 max-w-[1000px] w-full m-auto rounded-2xl flex gap-6 relative">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">Foods by Category</h2>

        <div
          className="flex justify-between items-center cursor-pointer hover:underline"
          onClick={() => router.push("/allDishes")}
        >
          <h3 className="text-lg font-semibold mt-4 mb-2">
            All Dishes ({allFoods.length})
          </h3>
          <span>See More</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              addToOrder={addToOrder}
              quantity={orderedFoods.find(item => item.food._id === food._id)?.quantity || 0}
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
                  addToOrder={addToOrder}
                  quantity={orderedFoods.find(item => item.food._id === food._id)?.quantity || 0}
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

      {renderCoverImage()}

      <CategoryComponent />

      {renderFoodCategories()}

      <OrderSidebar
        orderedFoods={orderedFoods}
        setOrderedFoods={setOrderedFoods}
      />

      <OrderStatus
        status={orderStatus}
        onClose={() => setOrderStatus("")}
      />
    </div>
  );
};

export default FoodClient;

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function toggleSidebar(arg0: string) {
  throw new Error("Function not implemented.");
}

