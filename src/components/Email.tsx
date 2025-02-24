"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRe = /^\d{8,}$/;

    if (!emailRe.test(email)) {
      setError("Your email format is incorrect");
      return false;
    }
    if (!passRe.test(password)) {
      setError("Password must be at least 8 digits and contain only numbers.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4040/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        router.push("/Login"); // 
      } else {
        setError(result.message || "Failed to save user");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-[1200px] w-[100%] m-auto">
    <div className="w-[50%] mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="w-[70%] m-auto">
      <Button variant="outline" size="icon" className="mb-4" onClick={() => router.back()}>
        <ChevronLeft />
      </Button>
      <h1 className="text-2xl font-bold text-center text-gray-900">Create your account</h1>
      <p className="mt-2 text-center text-gray-600">Sign up to explore your favorite dishes</p>

      <div className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

        <div className="flex items-center gap-2">
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
          className="w-full text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          variant="secondary"
          disabled={loading}
        >
          {loading ? "Registering..." : "Let's go"}
        </Button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <span className="text-blue-500 ml-2 cursor-pointer" 
          onClick={() => router.push("/Login")}>
            Log in
          </span>
        </p>
      </div>
      </div>
    </div>
    <div className="w-[50%]">zurag</div>
    </div>
  );
}
