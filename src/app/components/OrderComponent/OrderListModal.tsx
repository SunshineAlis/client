// import React, { useEffect, useState } from "react";
// import { useUser } from "@/provider/UserProvider";
// import { ConfirmAddress } from "./ConfirmAddress";
// type Food = {
//   _id: string;
//   foodName: string;
//   price: number;
//   ingredients: string;
//   image?: string | null | File;
//   categoryId?: string;
//   imageUrl?: string;
// };

// type OrderListProps = {
//   orderedFoods: { food: Food; quantity: number }[];
//   setOrderedFoods: React.Dispatch<React.SetStateAction<{ food: Food; quantity: number }[]>>;
//   isOpen: boolean;
//   toggleSidebar: () => void;
// };

// const OrderList: React.FC<OrderListProps> = ({ orderedFoods, setOrderedFoods, isOpen, toggleSidebar }) => {
//   const { isAuthenticated } = useUser();
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   useEffect(() => {
//     if (!isAuthenticated) {
//       toggleSidebar();
//       return;
//     }
//     const savedOrder = localStorage.getItem("orderedFoods");
//     if (savedOrder) {
//       setOrderedFoods(JSON.parse(savedOrder));
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     if (!isAuthenticated) return;
//     if (orderedFoods.length > 0) {
//       localStorage.setItem("orderedFoods", JSON.stringify(orderedFoods));
//     } else {
//       localStorage.removeItem("orderedFoods");
//       toggleSidebar();
//     }
//   }, [orderedFoods, isAuthenticated]);

//   if (!isAuthenticated) return null;

//   const updateQuantity = (index: number, newQuantity: number) => {
//     const updatedOrders = [...orderedFoods];
//     updatedOrders[index].quantity = newQuantity;
//     setOrderedFoods(updatedOrders);
//   };

//   const removeItem = (index: number) => {
//     const updatedOrders = orderedFoods.filter((_, i) => i !== index);
//     setOrderedFoods(updatedOrders);
//   };

//   const totalPrice = orderedFoods.reduce((sum, order) => sum + order.food.price * order.quantity, 0);

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 transition-all duration-300 ${isOpen ? "w-80 opacity-100" : "w-0 opacity-0 invisible"
//         }`}
//       style={{ display: isOpen ? "block" : "none" }}
//     >
//       <button className="absolute top-2 right-3 text-gray-600 text-xl" onClick={toggleSidebar}>
//         ✖
//       </button>
//       <h2 className="text-2xl font-bold mb-4">Миний захиалга</h2>

//       {orderedFoods.length === 0 ? (
//         <p className="text-gray-600">Таны сагс хоосон байна.</p>
//       ) : (
//         <div>
//           {orderedFoods.map((order, index) => (
//             <div key={order.food._id} className="border p-4 mb-2 rounded-md flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-bold">{order.food.foodName}</h3>
//                 <p className="text-gray-700">Үнэ: {order.food.price}₮</p>
//                 <input
//                   type="number"
//                   min="1"
//                   value={order.quantity}
//                   onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
//                   className="border rounded p-1 w-16"
//                 />
//               </div>
//               <button className="text-red-500" onClick={() => removeItem(index)}>🗑</button>
//             </div>
//           ))}
//           <p className="text-right text-xl font-bold text-red-600 mt-4">Нийт: {totalPrice}₮</p>
//         </div>
//       )}
//       <ConfirmAddress />
//       <div className="flex justify-end mt-4">
//         <button className="bg-gray-300 px-4 py-2 rounded-md mr-2" onClick={toggleSidebar}>
//           Close
//         </button>
//         <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
//           Submit Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderList;
