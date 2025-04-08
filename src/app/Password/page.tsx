"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react"
import { useRouter } from 'next/navigation';

const DirectPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  useEffect(() => {
    const fetchCover = async () => {
      try {
        const res = await axios.get("http://localhost:3030/img/forgotPassword");
        setCoverUrl(res.data.url);
      } catch (error) {
        console.error("Failed to fetch cover image:", error);
      }
    };
    fetchCover();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3030/user/Pass', {
        email,
        newPassword,
      });

      if (res.status === 200) {
        setMessage('Password reset successful');
      }
    } catch (error: any) {
      setMessage('Failed to reset password');
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-[1200px] w-full m-auto flex items-center justify-center my-40">
      <div className="w-full md:w-[50%] my-10 px-6 py-10 mx-6 bg-white shadow-md rounded-lg">
        <div className="w-[80%] m-auto flex flex-col gap-4 py-10">
          <Button variant="outline" size="icon" onClick={() => router.push("/")}>
            <ChevronLeft />
          </Button>
          <h1 className="text-3xl font-bold text-start text-gray-900">Reset Password</h1>
          <p className="text-start text-gray-600 mb-6">Enter your email and new password to reset your account</p>

          <input
            className="border-2 border-gray-300 px-4 py-3 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border-2 border-gray-300 px-4 py-3 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg"
          >
            Reset Password
          </button>

          <div className="flex gap-2 items-center mt-4">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onCheckedChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password" className="text-gray-600">Show password</label>
          </div>

          {message && (
            <p className={`text-center mt-2 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
      <div className="w-[50%]">
        <div className="w-full h-[90%] overflow-hidden rounded-md shadow-md">
          {coverUrl ? (
            <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <p className="text-center text-gray-500 mt-28">Loading image...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectPasswordReset;
