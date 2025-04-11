"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../provider/UserProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "../provider/CartProvider";
type ContactInfo = {
  email: string;
  phone: string;
  address: string;
};

export default function SubmitOrder({
  setOrderStatus,
  orderStatus,
}: {
  setOrderStatus: (status: "success" | "error" | "") => void;
  orderStatus: "success" | "error" | "";
}) {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { orderedFoods, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const API_URL = "https://service-jus0.onrender.com"
  const validateInputs = () => {
    if (!contactInfo.email || !contactInfo.phone || !contactInfo.address) {
      throw new Error("Email, phone, and address are required");
    }
    if (orderedFoods.length === 0) {
      throw new Error("Your cart is empty");
    }
    if (!isConfirmed) {
      throw new Error("Please confirm your information");
    }
  };

  const updateUserInfo = async (token: string) => {
    const updatedData = {
      phone: contactInfo.phone,
      address: contactInfo.address,
    };

    const response = await axios.put(`${API_URL}/user/information`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.user) {
      throw new Error("Failed to update user information");
    }

    return response.data.user;
  };

  const submitOrder = async (token: string, updatedUser: any) => {
    const orderData = {
      user: updatedUser._id,
      contactInfo: {
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
      items: orderedFoods.map((item) => ({
        foodId: item.food._id,
        foodName: item.food.foodName,
        price: item.food.price,
        quantity: item.quantity,
      })),
      status: "PENDING",
    };

    await axios.post(`${API_URL}/order`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  const submitFoodOrder = async () => {
    try {
      setLoading(true);
      validateInputs();
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const updatedUser = await updateUserInfo(token);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      await submitOrder(token, updatedUser);

      setOrderStatus("success");
      clearCart();
      router.push("/");
      alert("Successfull ordered")
    } catch (error: any) {
      console.error("Order error:", error);
      setOrderStatus("error");
      alert(error.message || "There was an error processing your order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderStatus === "success") {
      const timer = setTimeout(() => router.push("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [orderStatus, router]);

  if (orderStatus === "success") {
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded-md">
        Order placed successfully! Redirecting...
      </div>
    );
  }
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
      <div className="space-y-3">
        <h3 className="font-semibold">Contact info</h3>
        <div>
          <label htmlFor="email" className="text-gray-600 ml-2 block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-gray-600 ml-2 block mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="text-gray-600 ml-2 block mb-1">
            Delivery Address
          </label>
          <textarea
            id="address"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <Checkbox
          id="confirm-checkbox"
          checked={isConfirmed}
          onCheckedChange={(checked) => setIsConfirmed(!!checked)}
          className="mr-2"
        />
        <label htmlFor="confirm-checkbox" className="text-gray-600">
          I confirm my information is correct
        </label>
      </div>

      <button
        onClick={submitFoodOrder}
        disabled={loading || !isConfirmed}
        className={`w - full py - 2 rounded - lg mt - 4 ${loading || !isConfirmed
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {loading ? "Processing..." : "Submit Order"}
      </button>
    </div>
  );
}
