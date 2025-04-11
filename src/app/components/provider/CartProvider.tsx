"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserProvider";


const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [orderedFoods, setOrderedFoods] = useState<OrderedFood[]>([]);
    const { isAuthenticated } = useUser();
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
        const savedOrder = localStorage.getItem("orderedFoods");
        if (savedOrder) {
            try {
                const parsedOrder = JSON.parse(savedOrder);
                if (JSON.stringify(parsedOrder) !== JSON.stringify(orderedFoods)) {
                    setOrderedFoods(parsedOrder);
                }
            } catch (error) {
                console.error("Failed to parse saved order:", error);
                localStorage.removeItem("orderedFoods");
            }
        }
    }, [orderedFoods])
    const addToOrder = (food: Food, quantity: number) => {
        if (!isAuthenticated) {
            alert("Please login.");
            return;
        }
        if (quantity <= 0) return;
        setOrderedFoods((prev) => {
            const existing = prev.find(item => item.food._id === food._id);
            const newOrder = existing
                ? prev.map(item =>
                    item.food._id === food._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                : [...prev, { food, quantity }];

            if (JSON.stringify(newOrder) !== JSON.stringify(prev)) {
                localStorage.setItem("orderedFoods", JSON.stringify(newOrder));
            }
            return newOrder;
        });
    };
    const updateQuantity = (foodId: string, newQuantity: number) => {
        setOrderedFoods(prev => {
            const updated = prev.map(item =>
                item.food._id === foodId ? { ...item, quantity: newQuantity } : item
            );
            localStorage.setItem("orderedFoods", JSON.stringify(updated));
            return updated;
        });
    };

    const removeItem = (index: number) => {
        setOrderedFoods(prev => {
            const updated = prev.filter((_, i) => i !== index);
            localStorage.setItem("orderedFoods", JSON.stringify(updated));
            return updated;
        });
    };
    const clearCart = () => {
        setOrderedFoods([]);
        localStorage.removeItem("orderedFoods");
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
                setOrderedFoods,
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
