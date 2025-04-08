"use client";
import React, { createContext, useContext, useState } from "react";

type ViewType = "basket" | "orderHistory" | null;

interface OrderSidebarContextType {
    isOpen: boolean;
    currentView: ViewType;
    toggleSidebar: (view: ViewType) => void;
    closeSidebar: () => void;
}

const OrderSidebarContext = createContext<OrderSidebarContextType | undefined>(undefined);

export const OrderSidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentView, setCurrentView] = useState<ViewType>(null);
    const toggleSidebar = (view: ViewType = "basket") => {
        if (isOpen && currentView === view) {
            setIsOpen(false);
            setCurrentView(null);
        } else {
            setCurrentView(view);
            setIsOpen(true);
        }
    };

    const closeSidebar = () => {
        setIsOpen(false);
        setCurrentView(null);
    };

    return (
        <OrderSidebarContext.Provider value={{ isOpen, currentView, toggleSidebar, closeSidebar }}>
            {children}
        </OrderSidebarContext.Provider>
    );
};

export const useOrderSidebar = () => {
    const context = useContext(OrderSidebarContext);
    if (!context) {
        throw new Error("useOrderSidebar must be used within OrderSidebarProvider");
    }
    return context;
};