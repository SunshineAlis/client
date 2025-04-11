"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { CoverImage } from "@/app/components/CoverImg";

export const EmailStep = ({
  setStep,
  setUserData,
}: {
  setStep: Dispatch<SetStateAction<string>>;
  setUserData: (value: string) => void;
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");
  const API_URL = "https://service-jus0.onrender.com"
  const validateForm = () => {
    const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRe.test(email)) {
      setError("Your email format is incorrect");
      return false;
    }
    return true;
  };
  const handleClick = async () => {
    if (!validateForm()) return;
    setError("");
    setUserData(email);
    try {
      const response = await axios.post(`${API_URL}/user`, {
        email: email,
      });
      if (response.status === 200) {
        setStep("password");
      } else {
        setError(response.data.message || "Failed to save user");
      }
    } catch (err: any) {
      console.error("Server Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full p-20">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="max-w-md w-full space-y-6">
          <Button
            variant="outline"
            size="icon"
            className="mb-4"
            onClick={() => router.push("/")}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 text-center">Create your account</h1>
          <p className="text-center text-gray-600">Sign up to explore your favorite dishes</p>
          <div className="flex flex-col gap-4">
            <input
              className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-800 py-3 rounded-lg"
              onClick={handleClick}
            >
              Let's go
            </Button>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?
              <span
                className="text-blue-500 ml-2 cursor-pointer hover:underline"
                onClick={() => router.push("/Login")}
              >
                Log in
              </span>
            </p>
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
    </div >
  );
};
