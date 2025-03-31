"use client";
import * as React from "react";

export const Logo = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-start ml-20 pl-10">
      <img src="foodDeliver.webp" className="w-[8%] rounded" />
      <div>
        <h1 className="ml-2 text-xl font-bold text-white  italic">
          Nom<span className="text-red-500">Nom</span>
        </h1>
        <p className="text-white ml-2">Swift Delivery</p>
      </div>
    </div>
  );
}
