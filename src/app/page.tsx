"use client";
// import Email from "@/components/Email";
import axios from "axios";
import { useEffect } from "react";
import SignUp from "./sign-up/page";
import Left from "./components/Left";
import FoodClient from "./components/FoodClient";
import ClientHeader from "./components/ClientHeader";
import CategoryComponent from "./components/CategoryComponent";
import FoodCategory from "./components/FoodCategory";

export default function Home() {
  return (
    <div>
      <ClientHeader />
      <div className="flex" >
        <div>
          <Left />
          <FoodCategory />
          <FoodClient />
        </div>
      </div>


    </div>
  );
}
