"use client";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

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
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const response = await axios.get('http://localhost:3030/img', {
          params: { page: 'sign-up' },
          responseType: 'blob'
        });

        const imageUrl = URL.createObjectURL(response.data);
        setCoverUrl(imageUrl);

      } catch (error) {
        console.error('Error fetching cover image:', error);
      }
    };

    fetchCover();

    return () => {
      if (coverUrl) {
        URL.revokeObjectURL(coverUrl);
      }
    };
  }, []);

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
      const response = await axios.post("http://localhost:3030/user", {
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
    <div className="flex max-w-[1200px] w-[100%] m-auto min-h-screen">

      <div className="w-[50%] mx-auto my-auto p-8 bg-white shadow-md rounded-lg">
        <div className="w-[70%] m-auto">
          <Button
            variant="outline"
            size="icon"
            className="mb-4"
            onClick={() => router.push("/")}
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
      <div className="w-[50%] relative">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt="Cover"
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Loading image...</p>
          </div>
        )}
      </div>
    </div>
  );
};