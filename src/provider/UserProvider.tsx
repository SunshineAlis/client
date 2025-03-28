"use client";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
    email?: string;
    role?: string;
};

type UserContextType = {
    user?: UserType;
    isAuthenticated: boolean;
    setUser: (user: UserType | null) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<UserContextType>({
        isAuthenticated: false,
        setUser: (user) => {
            setState(prev => ({
                ...prev,
                user: user || undefined,
                isAuthenticated: !!user
            }));
        },
        logout: () => {
            localStorage.removeItem("token");
            setState(prev => ({
                ...prev,
                user: undefined,
                isAuthenticated: false
            }));
        }
    });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:3030/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setState(prev => ({
                        ...prev,
                        user: userData,
                        isAuthenticated: true
                    }));
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("User fetch error:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={state}>
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