"use client";
// import Email from "@/components/Email";
import axios from "axios";
import { useEffect } from "react";

import FoodClient from "../components/FoodClient";
import ClientHeader from "../components/ClientHeader";
import CategoryComponent from "../components/CategoryComponent";
import FoodCategory from "../components/FoodCategory";

export default function Home() {
    return (
        <div>
            <ClientHeader />
            <div className="flex" >
                <div>
                    <FoodCategory />
                    <FoodClient />
                </div>
            </div>


        </div>
    );
}
