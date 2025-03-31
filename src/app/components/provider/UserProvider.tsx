"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserType = {
    email?: string;
    role?: string;
    phone?: string;
    address?: string;
};

type UserContextType = {
    user?: UserType;
    isAuthenticated: boolean;
    isConfirmed: boolean;
    setIsConfirmed: (value: boolean) => void;
    setUser: (user: UserType | null) => void;
    logout: () => void;
    updateUser: (updatedUser: UserType) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [state, setState] = useState<Omit<UserContextType, "isConfirmed" | "setIsConfirmed">>({
        user: undefined,
        isAuthenticated: false,
        setUser: (user) => {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                setState((prev) => ({
                    ...prev,
                    user,
                    isAuthenticated: true,
                }));
            } else {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setState((prev) => ({
                    ...prev,
                    user: undefined,
                    isAuthenticated: false,
                }));
            }
        },
        logout: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setState((prev) => ({
                ...prev,
                user: undefined,
                isAuthenticated: false,
            }));
            router.push("/login");
        },
        updateUser: (updatedUser: UserType) => {
            setState((prev) => ({
                ...prev,
                user: updatedUser,
            }));
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    });

    useEffect(() => {
        const fetchUser = () => {
            try {
                const token = localStorage.getItem("token");
                const user = localStorage.getItem("user");

                if (token && user) {
                    setState((prev) => ({
                        ...prev,
                        user: JSON.parse(user),
                        isAuthenticated: true,
                    }));
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("User fetch error:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ ...state, isConfirmed, setIsConfirmed }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
