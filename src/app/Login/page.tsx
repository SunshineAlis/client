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
      const response = await axios.post("http://localhost:4040/user/login", {
        email: email,
        password: password,
      });
      console.log(response);
      // if (email===response.data.email)
    } catch (error) {}
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // app.post("/login", async (req, res) => {
    //   const { username, password } = req.body;
    //   const user = await findUserByUsername(username);

    //   if (!user || !(await verifyPassword(password, user.password))) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }

    //   const token = generateToken(user);
    //   res.json({ token });
    // });
  };
  return (
    <div className="max-w-[1200px] w-[100%] m-auto">
      {/* input  */}
      <div className="w-[100%] mx-auto my-[200px] px-2 mx-10 py-4 my-4 bg-white shadow-md rounded-lg">
        <div className="w-[80%] m-auto flex flex-col gap-4 py-10">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Log in
          </h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Log in to enjoy your favorite dishes
          </p>
          <input
            className="border px-8 py-4 rounded-xl h-[40px]"
            placeholder="Enter your email address"
          />
          <input
            className="border px-8 py-4 rounded-xl h-[40px]"
            placeholder="Password"
          />
          <div className="flex items-center space-x-2 ml-2 my-1">
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Forgot password ?
            </p>
          </div>
          <Button className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg">
            Let's go
          </Button>
          <p className="text-center text-gray-600">
            Don't have an account ?
            <span className="text-blue-500 ml-2"> Sign Up </span>
          </p>
        </div>
        {/* </div>
      image */}
        <div></div>
      </div>
    </div>
  );
}
