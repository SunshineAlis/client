"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/UserProvider";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3030/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user); // 这里只需要传用户数据
      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-[1200px] w-[100%] m-auto flex items-center my-40">
      <div className="w-[50%] my-10 px-2 py-10 mx-6 bg-white shadow-md rounded-lg">
        <div className="w-[80%] m-auto flex flex-col gap-2 py-10">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-start text-gray-900">Log in</h1>
          <p className="text-start text-gray-600 mb-4">Log in to enjoy your favorite dishes</p>

          <input
            className="border-2 px-4 py-3 rounded-lg my-2"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 px-4 py-3 rounded-lg my-2"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center space-x-2 ml-2 my-2">
            <p
              className="text-sm font-medium cursor-pointer text-blue-500 hover:text-blue-900"
              onClick={() => router.push("/forgotPassword")}
            >
              Forgot password?
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg"
          >
            Let's go
          </Button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-500 text-center mt-2">{success}</p>}

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-500 ml-2 cursor-pointer hover:text-blue-900"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <div className="w-[50%]">
        <img src="foodDeliver.webp" alt="Food Delivery" />
      </div>
    </div>
  );
}