"use client";
import { useState, useCallback } from "react";
import { useCategoryContext } from "@/app/components/provider/CategoryProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from "../components/provider/CartProvider";
import { useUser } from "../components/provider/UserProvider"
import FoodCard from "./FoodCart";
import { useOrderSidebar } from "../components/provider/OrderSideBar";
import { useRouter } from "next/navigation";
const CategoryComponent = () => {
  const { isAuthenticated } = useUser();
  const { categories } = useCategoryContext();
  const { addToOrder, orderedFoods } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { toggleSidebar } = useOrderSidebar();
  const allFoods = categories?.flatMap((cat) => cat.foods || []) || [];
  const router = useRouter()
  const selectedFoods =
    selectedCategoryId === null
      ? allFoods
      : categories?.find((cat) => cat._id === selectedCategoryId)?.foods || [];
  const handleAddToOrder = useCallback((food: Food) => {
    if (!isAuthenticated) {
      alert("Please login or signup.");
      router.push("/Login");
      return;
    }
    addToOrder(food, +1);
    toggleSidebar("basket");
  }, [isAuthenticated, router, addToOrder, toggleSidebar]);
  return (
    <div className="p-4 bg-gray-100 max-w-[1000px] w-full mx-auto rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-center sm:text-left">
        Dishes Category
      </h3>
      <div className="mt-4">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-auto">
              <div
                className={`px-3 py-1 text-sm sm:text-base rounded-lg whitespace-nowrap cursor-pointer ${selectedCategoryId === null
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
                onClick={() => setSelectedCategoryId(null)}
              >
                All Dishes ({allFoods.length})
              </div>
            </CarouselItem>

            {categories?.map((cat) => (
              <CarouselItem key={cat._id} className="basis-auto">
                <div
                  className={`px-3 py-1 text-sm sm:text-base rounded-lg whitespace-nowrap cursor-pointer ${selectedCategoryId === cat._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  onClick={() => setSelectedCategoryId(cat._id)}
                >
                  {cat.categoryName} ({cat.foods?.length || 0})
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {categories && categories.length > 5 && (
            <>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </>
          )}
        </Carousel>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {selectedFoods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            addToOrder={handleAddToOrder}
            quantity={orderedFoods.find(item => item.food._id === food._id)?.quantity || 0}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryComponent;
