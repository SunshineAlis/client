"use client";
import React, { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useUser } from "../provider/UserProvider";
import axios from "axios";
import LoginMenu from "../HeaderComponents/LoginMenu";
import { Logo } from "../HeaderComponents/Logo";
import { useOrderSidebar } from "../provider/OrderSideBar";

interface HeaderProps {
  orderedFoodsCount: number;
}

const ClientHeader: React.FC<HeaderProps> = ({ orderedFoodsCount }) => {
  const router = useRouter();
  const { isAuthenticated, logout, user, setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: user?.address || "",
  });
  const [error, setError] = useState("");
  const { toggleSidebar } = useOrderSidebar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const confirmAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return;
    }
    try {
      const updatedData = { address: formData.address };
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      await axios.put("http://localhost:3030/user/information", updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (user) {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));
      alert("Address updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error!");
    }
  };

  return (
    <header className="bg-black shadow-md p-4 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-4 pr-1">
          <div className="relative flex items-center bg-white h-10 w-full sm:w-[280px] rounded-full px-4 shadow-md border border-gray-200">
            <MdOutlineLocationOn className="text-red-500 text-xl" />
            <p className="text-sm text-red-500 font-medium ml-2 whitespace-nowrap">
              Delivery
            </p>
            <input
              type="text"
              placeholder="Location"
              className="ml-3 w-full sm:w-[120px] bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={formData.address || ""}
              onChange={handleChange}
              name="address"
            />
            <IoIosArrowForward
              className="text-gray-500 text-xl ml-2 cursor-pointer hover:text-red-500 transition"
              onClick={confirmAddress}
            />
          </div>

          <button
            onClick={() => toggleSidebar("basket")}
            className="relative bg-white p-2 rounded-full shadow-md border hover:bg-gray-100 transition"
          >
            <SlBasket className="text-black text-xl" />
            {orderedFoodsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {orderedFoodsCount}
              </span>
            )}
          </button>

          <div className="relative">
            {isAuthenticated ? (
              <>
                <button
                  className="bg-red-500 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-red-600 transition"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <IoPersonOutline className="text-white text-2xl" />
                </button>
                {menuOpen && (
                  <LoginMenu logout={logout} setMenuOpen={setMenuOpen} />
                )}
              </>
            ) : (
              <IoPersonOutline
                className="text-white text-2xl cursor-pointer"
                onClick={() => router.push("/sign-up")}
              />
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="text-center mt-2 text-sm text-red-500 font-medium">
          {error}
        </div>
      )}
    </header>
  );
};

export default ClientHeader;