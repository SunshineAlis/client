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
import { RenderingCate } from "./RenderingCate";

const FoodClient: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");
  const { orderedFoods, setOrderedFoods } = useCart();
  // useEffect(() => {
  //   const loadSavedOrder = () => {
  //     const savedOrder = localStorage.getItem("orderedFoods");
  //     if (savedOrder) {
  //       try {
  //         setOrderedFoods(JSON.parse(savedOrder));
  //       } catch (error) {
  //         console.error("Failed to parse saved order:", error);
  //         localStorage.removeItem("orderedFoods");
  //       }
  //     }
  //   };
  //   loadSavedOrder();
  // }, []);
  return (
    <div className="bg-gray-100 min-h-screen m-auto max-w-[1000px]">
      <ClientHeader orderedFoodsCount={orderedFoods.length} />
      <img src="BG.png"
        className="rounded-lg max-w-[1100px] w-[100%] m-auto" />
      <CategoryComponent />
      { }
      <RenderingCate />
      <OrderSidebar
      />
      <OrderStatus
        status={orderStatus}
        onClose={() => setOrderStatus("")}
      />
    </div>
  );
}; export default FoodClient;
