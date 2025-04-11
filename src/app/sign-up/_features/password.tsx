"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { CoverImage } from "@/app/components/CoverImg";
export const Password = ({ userData }: { userData: string }) => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = "https://service-jus0.onrender.com"
  const validateForm = () => {
    try {
      const passVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passVal.test(password)) {
        setError(
          "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number."
        );
        return false;
      }
      return true;
    } catch (err: any) {
      setError(err.errors?.join("\n") || "Validation failed");
      return false;
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setError("");
    try {
      console.log("Sending data to backend:", { email: userData, password });
      const response = await axios.post(`${API_URL}/user/signup`, {
        email: userData,
        password,
      });
      if (response.status === 201) {
        router.push("/Login");
      } else {
        setError(response.data.message || "Failed to save user");
      }
    } catch (err: any) {
      console.error("Server Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex max-w-[1200px] w-[100%] m-auto py-10">
      <div className="w-[50%] mx-auto   bg-white shadow-md rounded-lg">
        <div className="w-[60%] m-auto px-4 py-10 my-2">
          <Button size="icon" className="mb-4" onClick={() => router.push("/")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Create a strong password
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Create a strong password with letters, numbers
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <input
              className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onCheckedChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password" className="text-sm font-medium">
                Show password
              </label>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg"
              variant="secondary"
              onClick={handleSubmit}
            >
              Let's go
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </div>
      </div>
      <div className="w-[50%]">
        <div className="w-full h-full overflow-hidden rounded-md shadow-md">
          <CoverImage page="sign-up"
            className="w-full h-full object-cover" />
        </div>

        {/* <div className="w-full h-full overflow-hidden rounded-md shadow-md">
          <img src="login.jpg" alt="Cover" className="w-full h-full object-cover" />
        </div> */}
      </div>
    </div>
  );
};
