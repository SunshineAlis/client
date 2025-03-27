import axios from "axios";
import { useState } from "react";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  categoryId?: string;
};

type OrderedFood = {
  food: Food;
  quantity: number;
};

type SubmitOrderProps = {
  orderedFoods: OrderedFood[];
  setOrderedFoods: (foods: OrderedFood[]) => void;
  setOrderStatus: (status: "" | "success" | "error") => void;
};

export default function SubmitOrder({
  orderedFoods,
  setOrderedFoods,
  setOrderStatus,
}: SubmitOrderProps) {
  const [loading, setLoading] = useState(false);

  const submitFoodOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        totalPrice: orderedFoods.reduce(
          (sum, item) => sum + item.food.price * item.quantity,
          0
        ),
      };
      console.log("📦 Final order data:", orderData);

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
