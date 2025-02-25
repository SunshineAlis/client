"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import * as yup from "yup";

import { Button } from "@/components/ui/button";

export default function Login() {
const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const passwordCheck = yup.string()
  .min(8, "Password at least 8 characters")
  .required("Please enter password")
    const handleSubmit =  () => {
         passwordCheck.validate({ password });
        router.push("/"); 
    };
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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



  return (
    <div className="max-w-[1200px] w-[100%] m-auto">
      {/* input  */}
      <div className="flex w-[50%] pl-[100px] py-[200px]">
        <div className="flex flex-col gap-3 ">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Create a strong password
          </h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Create a strong password with letters, numbers
          </p>
          <input
            className="border px-8 py-4 rounded-xl"
            placeholder="Password"
          />
          <input
            className="border px-8 py-4 rounded-xl h-4"
            placeholder="Confirm"
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show password
            </label>
          </div>
          <Button className="text-white bg-gray-400" variant="secondary">
            Let's go
          </Button>
          <p className="text-center text-gray-600">
            Already have an account?
            <span className="text-blue-500 ml-2">Log in </span>
          </p>
        </div>
        {/* </div>
      image */}
        <div></div>
      </div>
    </div>
  );
}
