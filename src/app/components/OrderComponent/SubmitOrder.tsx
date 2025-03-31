"use client";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@/provider/UserProvider";
export default function SubmitOrder({
  orderedFoods,
  setOrderedFoods,
  setOrderStatus,
}: SubmitOrderProps) {
  const { isConfirmed } = useUser();
  const [loading, setLoading] = useState(false);

  const submitFoodOrder = async () => {
    if (!isConfirmed) {
      alert("⚠️ Please confirm address!");
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        totalPrice: orderedFoods.reduce(
          (sum, item) => sum + item.food.price * item.quantity,
          0
        ),
      };
      const response = await axios.post(
        "http://localhost:3030/order",
        orderData
      );
      console.log("Main order created:", response.data);
      localStorage.removeItem("orderedFoods");
      setOrderedFoods([]);
      setOrderStatus("success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          " Axios error creating order:",
          error.response?.data || error.message
        );
      } else {
        console.error("General error creating order:", error);
      }
      setOrderStatus("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={submitFoodOrder}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? "Ordering..." : "Submit Order"}
    </button>
  );
}
