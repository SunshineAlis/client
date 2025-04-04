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
const ClientHeader: React.FC<HeaderProps> = ({
  toggleSidebar,
  orderedFoodsCount,
}) => {
  const router = useRouter();
  const { isAuthenticated, logout, user, setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    address: user?.address || "",
  });
  const [error, setError] = useState("");

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
    <header className="bg-black shadow-md p-4 flex justify-between items-center">
      <Logo />
      <div className="relative flex items-center bg-white w-[50%] h-10 rounded-2xl px-4 shadow-md border border-gray-200">
        <MdOutlineLocationOn className="text-red-500 text-xl" />
        <p className="text-l text-red-500 font-medium">Delivery location</p>
        <input
          type="text"
          placeholder="Add Location"
          className="ml-3 w-[34%] bg-transparent outline-none text-gray-700 placeholder-gray-400"
          value={formData.address || ""}
          onChange={handleChange}
          name="address"
        />
        <IoIosArrowForward
          className="text-gray-500 text-xl ml-2 cursor-pointer"
          onClick={confirmAddress}
        />
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <button
        onClick={toggleSidebar}
        className="relative bg-gray-200 p-2 mx-2 rounded-2xl cursor-pointer"
      >
        <SlBasket className="text-2xl" />
        {orderedFoodsCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {orderedFoodsCount}
          </span>
        )}
      </button>

      <div className="relative mr-[120px]">
        {isAuthenticated ? (
          <div className="relative">
            <button
              className="bg-red-500 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <IoPersonOutline className="text-white text-2xl" />
            </button>

            {menuOpen && (
              <LoginMenu
                logout={logout}
                setMenuOpen={setMenuOpen}
              />
            )}
          </div>
        ) : (
          <IoPersonOutline
            className="text-white text-2xl cursor-pointer"
            onClick={() => router.push("/sign-up")}
          />
        )}
      </div>
    </header>
  );
};

export default ClientHeader;
