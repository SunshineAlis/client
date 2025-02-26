"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";
import axios from "axios";


type Email = {
  Email: string;
};

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");

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
    try {
      const response = await axios.post("http://localhost:4040/user", {
        email: email,
      });

      if (response.status === 200) {
        router.push("/Password"); //
      } else {
        setError(response.data.message || "Failed to save user");
      }
    } catch (err: any) {
      console.error("Server Error:", err);

      if (err.response) {
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Error connecting to server. Please try again later.");
      }
    }
  };

  return (
    <div className="flex max-w-[1200px] w-[100%] m-auto">
      <div className="w-[50%] mx-auto my-[200px] p-8 bg-white shadow-md rounded-lg">
        <div className="w-[70%] m-auto">
          <Button
            variant="outline"
            size="icon"
            className="mb-4"
            onClick={() => router.back()}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Sign up to explore your favorite dishes
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <input
              className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email address"
              value={email}
              formNoValidate
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg"
              onClick={handleClick}
            >
              Let's go
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <p className="text-center text-gray-600 mt-4">
              Already have an account?
              <span
                className="text-blue-500 ml-2 cursor-pointer"
                onClick={() => router.push("/Login")}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%]"></div>
    </div>
  );
}
