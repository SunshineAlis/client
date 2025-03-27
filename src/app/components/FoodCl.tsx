// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FoodCard from "./FoodCart";
// import Basket from "../components/basket";
// import FoodMenu from "../components/FoodMenu";

// type Food = {
//     _id: string;
//     foodName: string;
//     price: number;
//     ingredients: string;
//     image?: string | null | File;
//     categoryId?: string;
//     imageUrl?: string;
// };
// type Category = {
//     _id: string;
//     categoryName: string;
//     foods?: Food[];
// };

// export default function FoodCl() {
//     const [categoriesWithFoods, setCategoriesWithFoods] = useState<Category[]>([]);
//     const [orderedFoods, setOrderedFoods] = useState<{ food: Food; quantity: number }[]>([]);
//     const [isOpen, setIsOpen] = useState(false);

//     useEffect(() => {
//         const savedOrder = localStorage.getItem("orderedFoods");
//         if (savedOrder) {
//             setOrderedFoods(JSON.parse(savedOrder));
//         }

//         const fetchCategoriesWithFoods = async () => {
//             try {
//                 const { data } = await axios.get("http://localhost:3030/category");
//                 const categories = data.data;

//                 const categoriesData = await Promise.all(
//                     categories.map(async (category: Category) => {
//                         try {
//                             const { data } = await axios.get<{ foods: Food[] }>(`http://localhost:3030/foods/${category._id}/foods`);
//                             return { ...category, foods: data.foods || [] };
//                         } catch (error) {
//                             console.error(`Error fetching foods for ${category.categoryName}:`, error);
//                             return { ...category, foods: [] };
//                         }
//                     })
//                 );
//                 setCategoriesWithFoods(categoriesData);
//             } catch (error) {
//                 console.error("Error fetching categories with foods:", error);
//             }
//         };
//         fetchCategoriesWithFoods();
//     }, []);

//     const addToOrder = (food: Food) => {
//         setOrderedFoods((prev) => {
//             const existingOrder = prev.find((item) => item.food._id === food._id);
//             let updatedOrders;

//             if (existingOrder) {
//                 updatedOrders = prev.map((item) =>
//                     item.food._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
//                 );
//             } else {
//                 updatedOrders = [...prev, { food, quantity: 1 }];
//             }

//             localStorage.setItem("orderedFoods", JSON.stringify(updatedOrders));
//             return updatedOrders;
//         });

//         setIsOpen(true);
//     };

//     const toggleSidebar = () => {
//         setIsOpen((prev) => !prev);
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen p-4">
//             <div className="max-w-[1000px] w-full m-auto rounded-2xl flex gap-6 relative">
//                 <div className="w-full">
//                     {categoriesWithFoods.map((category) => (
//                         <div key={category._id}>
//                             <FoodMenu categoryName={category.categoryName} />
//                             <div className="grid grid-cols-4 gap-2">
//                                 {category.foods?.map((food) => (
//                                     <FoodCard key={food._id} food={food} addToOrder={addToOrder} />
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {isOpen && <Basket orderedFoods={orderedFoods} toggleSidebar={toggleSidebar} />}
//             </div>
//         </div>
//     );
// }
