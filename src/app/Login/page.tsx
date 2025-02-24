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

    // const handleSubmit = async () => {
    //   try {
    //     await passwordCheck.validate({ passwird });
       
    //     router.push("/Password"); 
    //   } catch (err) {
        
    //   }
    // };

  

    // function RegisterForm() {
    //   const [email, setEmail] = useState("");
    //   const [password, setPassword] = useState("");
    //   const [error, setError] = useState("");
    //   const [success, setSuccess] = useState("");
    
    //   const validateInput = () => {
    //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //       setError("Invalid email format");
    //       return false;
    //     }
    //     if (password.length < 8) {
    //       setError("Password must be at least 8 characters long");
    //       return false;
    //     }
    //     setError("");
    //     return true;
    //   };
    
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validateInput()) return;
    
    //     try {
    //       const response = await fetch("http://localhost:3000/users", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email, password }),
    //       });
    
    //       const data = await response.json();
    //       if (response.ok) {
    //         setSuccess("User registered successfully!");
    //         setEmail("");
    //         setPassword("");
    //       } else {
    //         setError(data.message || "Error registering user");
    //       }
    //     } catch (err) {
    //       setError("Server error, please try again later.");
    //     }
    //   };
    
    //   return (
    //     <form onSubmit={handleSubmit}>
    //       <input
    //         type="email"
    //         placeholder="Enter email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         placeholder="Enter password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       {error && <p style={{ color: "red" }}>{error}</p>}
    //       {success && <p style={{ color: "green" }}>{success}</p>}
    //       <button type="submit">Register</button>
    //     </form>
    //   );
    // }
    
    // export default RegisterForm;
    


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
