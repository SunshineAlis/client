"use client";
// import Email from "@/components/Email";
import axios from "axios";
import { useEffect, useState } from "react";
import FoodClient from "../components/FoodClient";
import FoodCategory from "../components/FoodCategory";
import Header from "../components/ClientHeader"; // 
type Food = {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
};
type Category = {
    _id: string;
    categoryName: string;
    foods?: Food[];
};

export default function Home() {



    return (
        <div>
            <FoodClient />
        </div >
    );
}
