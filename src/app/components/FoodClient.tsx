"use client";
import React, { useState } from "react";
import ClientHeader from "./HeaderComponents/ClientHeader";
import OrderSidebar from "../components/HeaderComponents/OrderSideBar";
import OrderStatus from "../components/OrderComponent/OrderStatus";
import { useCart } from "./provider/CartProvider";
import CategoryComponent from "./CategoryComponent";
import { RenderingCate } from "./RenderingCate";
import { CoverImage } from "./CoverImg";
const FoodClient: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<"" | "success" | "error">("");
  const { orderedFoods } = useCart();
  return (
    <div className="bg-gray-100 min-h-screen m-auto max-w-[1000px] relative">
      <ClientHeader orderedFoodsCount={orderedFoods.length} />
      <CoverImage page="/" className="rounded-lg max-w-[1100px] w-[100%] m-auto" />
      <CategoryComponent />
      <RenderingCate />
      <OrderSidebar
        setOrderStatus={setOrderStatus}
        orderStatus={orderStatus}
      />
      {orderStatus && (
        <OrderStatus
          status={orderStatus}
          onClose={() => setOrderStatus("")}
        />
      )}
    </div>
  );
};

export default FoodClient;
