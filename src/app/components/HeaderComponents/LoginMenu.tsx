"use client";
import React from "react";
import { useRouter } from "next/navigation";
const LoginMenu: React.FC<LoginMenuProps> = ({ logout, setMenuOpen }) => {
    const router = useRouter();

    return (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-10">
            <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => router.push("/settings")}
            >
                ⚙ Settings
            </button>
            <button
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={async () => {
                    await logout();
                    setMenuOpen(false);
                    router.push("/");
                }}

            >
                🚪 Logout
            </button>
        </div>
    );
};

export default LoginMenu;
