"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../provider/UserProvider";
import { Checkbox } from "@/components/ui/checkbox";
export default function SubmitOrder({
  orderedFoods,
  setOrderedFoods,
  setOrderStatus, //
}: {
  orderedFoods: FoodOrderItem[];
  setOrderedFoods: (foods: FoodOrderItem[]) => void;
  setOrderStatus: (status: "success" | "error" | "") => void;
}) {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const submitFoodOrder = async () => {
    try {
      setLoading(true);
      if (!contactInfo.email || !contactInfo.phone || !contactInfo.address) {
        alert("Email, phone, address must be required.");
        return;
      }
      if (orderedFoods.length === 0) {
        alert("Order list empty!");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login!");
        return;
      }
      const updatedData = {
        phone: contactInfo.phone,
        address: contactInfo.address,
      };
      const userUpdateResponse = await axios.put("http://localhost:3030/user/information", updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUser = userUpdateResponse.data.user;
      if (!updatedUser) {
        console.error("User information not found.!");
        return;
      }
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
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
      await axios.post("http://localhost:3030/order", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderStatus("success");
      localStorage.removeItem("orderedFoods");
      setOrderedFoods([]);
      router.push("/");
    } catch (error: any) {
      console.error("order error:", error);
      alert(error.response?.data?.message || "There was an error sending the order.!");
      setOrderStatus("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
      <div className="space-y-3">
        <h3 className="font-semibold">Contact info</h3>
        <label htmlFor="email" className="text-gray-600 ml-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          placeholder="email *"
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor="phone" className="text-gray-600 ml-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={contactInfo.phone}
          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
          placeholder="Phone number *"
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor="address" className="text-gray-600 ml-2 pt-2">
          Delivery Address
        </label>
        <textarea
          id="address"
          value={contactInfo.address}
          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
          placeholder="Delivery Address *"
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
      </div>
      <Checkbox
        id="confirm-checkbox"
        checked={isConfirmed}
        onCheckedChange={(checked) => setIsConfirmed(!!checked)}
      />
      <label htmlFor="confirm-checkbox" className="text-gray-600 ml-2">
        Information confirmed.
      </label>

      <button
        onClick={submitFoodOrder}
        disabled={loading || !isConfirmed}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Sending..." : "Submit Order"}
      </button>
    </div>
  );
}
