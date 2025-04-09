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
  const { orderedFoods, clearCart } = useCart(); // Get from cart context
  const [loading, setLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

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

    const response = await axios.put("http://localhost:3030/user/information", updatedData, {
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

    await axios.post("http://localhost:3030/order", orderData, {
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
        className={`w-full py-2 rounded-lg mt-4 ${loading || !isConfirmed
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {loading ? "Processing..." : "Submit Order"}
      </button>
    </div>
  );
}










// export default function SubmitOrder({
//   orderedFoods,
//   setOrderedFoods,
//   setOrderStatus,
//   orderStatus,
// }: {
//   orderedFoods: FoodOrderItem[];
//   setOrderedFoods: (foods: FoodOrderItem[]) => void;
//   setOrderStatus: (status: "success" | "error" | "") => void;
//   orderStatus: "success" | "error" | "";
// }) {
//   const router = useRouter();
//   const { user, setUser } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [contactInfo, setContactInfo] = useState({
//     email: user?.email || "",
//     phone: user?.phone || "",
//     address: user?.address || "",
//   });
//   const submitFoodOrder = async () => {
//     try {
//       setLoading(true);
//       if (!contactInfo.email || !contactInfo.phone || !contactInfo.address) {
//         alert("Email, phone, address must be required.");
//         return;
//       }
//       if (orderedFoods.length === 0) {
//         alert("Order list empty!");
//         return;
//       }
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please login!");
//         return;
//       }
//       const updatedData = {
//         phone: contactInfo.phone,
//         address: contactInfo.address,
//       };
//       const userUpdateResponse = await axios.put("http://localhost:3030/user/information", updatedData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const updatedUser = userUpdateResponse.data.user;
//       if (!updatedUser) {
//         console.error("User information not found.!");
//         return;
//       }
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       const orderData = {
//         user: updatedUser._id,
//         contactInfo: {
//           email: updatedUser.email,
//           phone: updatedUser.phone,
//           address: updatedUser.address,
//         },
//         items: orderedFoods.map((item) => ({
//           foodId: item.food._id,
//           foodName: item.food.foodName,
//           price: item.food.price,
//           quantity: item.quantity,
//         })),
//         status: "PENDING",
//       };
//       await axios.post("http://localhost:3030/order", orderData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrderStatus("success");
//       localStorage.removeItem("orderedFoods");
//       setOrderedFoods([]);
//       router.push("/");
//     } catch (error: any) {
//       console.error("order error:", error);
//       alert(error.response?.data?.message || "There was an error sending the order.!");
//       setOrderStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (orderStatus === "success") {
//       const timer = setTimeout(() => {
//         router.push("/");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [orderStatus]);
//   return (
//     <div className="space-y-4 p-4 bg-white rounded-lg shadow">
//       <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
//       {orderStatus === "success" && (
//         <div className="p-4 bg-green-100 text-green-800 rounded-md">
//           Order placed successfully!
//         </div>
//       )}
//       {orderStatus !== "success" && (
//         <>
//           <div className="space-y-3">
//             <h3 className="font-semibold">Contact info</h3>
//             <label htmlFor="email" className="text-gray-600 ml-2">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={contactInfo.email}
//               onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
//               placeholder="email *"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <label htmlFor="phone" className="text-gray-600 ml-2">
//               Phone Number
//             </label>
//             <input
//               id="phone"
//               type="tel"
//               value={contactInfo.phone}
//               onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
//               placeholder="Phone number *"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <label htmlFor="address" className="text-gray-600 ml-2 pt-2">
//               Delivery Address
//             </label>
//             <textarea
//               id="address"
//               value={contactInfo.address}
//               onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
//               placeholder="Delivery Address *"
//               className="w-full p-2 border rounded"
//               rows={3}
//               required
//             />
//           </div>
//           <Checkbox
//             id="confirm-checkbox"
//             checked={isConfirmed}
//             onCheckedChange={(checked) => setIsConfirmed(!!checked)}
//           />
//           <label htmlFor="confirm-checkbox" className="text-gray-600 ml-2">
//             Information confirmed.
//           </label>

//           <button
//             onClick={submitFoodOrder}
//             disabled={loading || !isConfirmed}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {loading ? "Sending..." : "Submit Order"}
//           </button>
//         </>
//       )}
//     </div>
//   );

// }
