"use client";
import Left from "./components/Left";
import FoodClient from "./components/FoodClient";
import FoodCategory from "./components/FoodCategory";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <Left />
        <FoodClient />
      </div>
    </div>
  );
}
