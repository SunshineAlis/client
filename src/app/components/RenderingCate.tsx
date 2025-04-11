"use client";
import { useCategoryContext } from "@/app/components/provider/CategoryProvider";
import FoodCard from "./FoodCart";
import { useCart } from "./provider/CartProvider";
import { useOrderSidebar } from "./provider/OrderSideBar";
import { useRouter } from "next/navigation";
import { useUser } from "./provider/UserProvider";

export const RenderingCate = () => {
    const { categories } = useCategoryContext();
    const { isAuthenticated } = useUser();
    const router = useRouter();
    const { toggleSidebar } = useOrderSidebar();
    const { addToOrder, orderedFoods } = useCart();

    const handleAddToOrder = (food: Food, quantity: number) => {
        if (!isAuthenticated) {
            alert("Please login");
            router.push("/Login");
            return;
        }
        addToOrder(food, quantity);
        toggleSidebar("basket");
    };

    const foodCountByCategory = categories.reduce<Record<string, number>>(
        (acc, cat) => {
            acc[cat._id] = cat.foods?.length || 0;
            return acc;
        },
        {}
    );

    return (
        <div className="max-w-[1000px]">
            {categories.map((category) => (
                <div key={category._id}>
                    <h3 className="text-lg font-semibold mt-4 mb-2">
                        {category.categoryName} ({foodCountByCategory[category._id]})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {category.foods?.map((food) => (
                            <FoodCard
                                key={food._id}
                                food={food}
                                addToOrder={handleAddToOrder}
                                quantity={
                                    orderedFoods.find((item) => item.food._id === food._id)?.quantity || 0
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
