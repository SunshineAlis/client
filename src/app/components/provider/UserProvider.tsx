"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [state, setState] = useState<{
        user: User | null;
        isAuthenticated: boolean;
        isConfirmed: boolean;
    }>({
        user: null,
        isAuthenticated: false,
        isConfirmed: false,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userJson = localStorage.getItem("user");

        if (token && userJson) {
            try {
                const user = JSON.parse(userJson);
                setState({
                    user,
                    isAuthenticated: true,
                    isConfirmed: localStorage.getItem("isConfirmed") === "true",
                });
            } catch (error) {
                console.error("Error:", error);
                logout();
            }
        }
    }, []);

    const setUser = useCallback((user: User | null) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
            }));
        } else {
            localStorage.removeItem("user");
            setState(prev => ({
                ...prev,
                user: null,
                isAuthenticated: false,
            }));
        }
    }, []);

    const setIsConfirmed = useCallback((isConfirmed: boolean) => {
        localStorage.setItem("isConfirmed", String(isConfirmed));
        setState(prev => ({ ...prev, isConfirmed }));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isConfirmed");
        setState({
            user: null,
            isAuthenticated: false,
            isConfirmed: false,
        });
        router.push("/login");
    }, [router]);

    const updateUser = useCallback((updatedUser: Partial<User>) => {
        setState(prev => {
            if (!prev.user) return prev;

            const newUser = { ...prev.user, ...updatedUser };
            localStorage.setItem("user", JSON.stringify(newUser));
            return {
                ...prev,
                user: newUser,
            };
        });
    }, []);

    return (
        <UserContext.Provider
            value={{
                ...state,
                setUser,
                setIsConfirmed,
                logout,
                updateUser,
            }}
        >
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
