"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Login = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3030/user/login", {
        email: email,
        password: password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("token", response.data.token);
      alert("Login successful");
      router.push("/sign-up");
    } catch (error) {}
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
  };
  return (
    <div className="max-w-[1200px] w-[100%] m-auto flex items-center my-40">
      {/* input  */}
      <div className="w-[50%] my-10 px-2 py-10 mx-6  bg-white shadow-md rounded-lg">
        <div className="w-[80%] m-auto flex flex-col gap-2 py-10">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-start text-gray-900 dark:text-white">
            Log in
          </h1>
          <p className="text-start text-gray-600 mb-4 dark:text-gray-400">
            Log in to enjoy your favorite dishes
          </p>
          <input
            className="border-2 px-4 py-3 rounded-lg my-4"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 px-4 py-3 rounded-lg "
            placeholder="Enter your email address"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center space-x-2 ml-2 my-4">
            <p
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              onClick={() => router.push("/forgotPassword")}
            >
              Forgot password ?
            </p>
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg"
          >
            Let's go
          </Button>
          <p className="text-center text-gray-600">
            Don't have an account ?
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
        <img src="foodDeliver.webp" />
      </div>
    </div>
  );
}
