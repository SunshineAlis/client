"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserProvider";
import { useOrderSidebar } from "./OrderSideBar";
import { useRouter } from "next/navigation";

export type Food = {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
};

type OrderedFood = {
    food: Food;
    quantity: number;
};

type CartContextType = {
    orderedFoods: OrderedFood[];
    addToOrder: (food: Food, quantity: number) => void;
    updateQuantity: (foodId: string, newQuantity: number) => void;
    removeItem: (index: number) => void;
    clearCart: () => void;
    refetch: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [orderedFoods, setOrderedFoods] = useState<OrderedFood[]>([]);
    const { isAuthenticated } = useUser();
    const router = useRouter();
    const { toggleSidebar } = useOrderSidebar();
    useEffect(() => {
        const savedOrder = localStorage.getItem("orderedFoods");
        if (savedOrder) {
            try {
                const parsedOrder = JSON.parse(savedOrder);
                setOrderedFoods(parsedOrder);
            } catch (error) {
                console.error("Failed to parse saved order:", error);
                localStorage.removeItem("orderedFoods");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("orderedFoods", JSON.stringify(orderedFoods));
    }, [orderedFoods]);

    const addToOrder = (food: Food, quantity: number) => {
        if (!isAuthenticated) {
            alert("Захиалга өгөхийн тулд нэвтэрнэ үү.");
            router.push("/Login");
            return;
        }

        setOrderedFoods((prev) => {
            const existing = prev.find((item) => item.food._id === food._id);
            const newOrder = existing
                ? prev.map((item) =>
                    item.food._id === food._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                : [...prev, { food, quantity }];

            // Open the sidebar when adding items
            toggleSidebar("basket");
            return newOrder;
        });
    };

    const updateQuantity = (foodId: string, newQuantity: number) => {
        setOrderedFoods((prev) =>
            prev.map((item) =>
                item.food._id === foodId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (index: number) => {
        setOrderedFoods((prev) => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setOrderedFoods([]);
    };

    return (
        <CartContext.Provider
            value={{
                orderedFoods,
                addToOrder,
                updateQuantity,
                removeItem,
                clearCart,
                refetch: () => {

                    const savedOrder = localStorage.getItem("orderedFoods");
                    if (savedOrder) {
                        try {
                            setOrderedFoods(JSON.parse(savedOrder));
                        } catch (error) {
                            console.error("Failed to parse saved order:", error);
                        }
                    }
                },
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
