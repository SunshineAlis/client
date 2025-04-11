"use client";
import { CiFacebook } from "react-icons/ci";
import { RxInstagramLogo } from "react-icons/rx";
import ResIcon from "./../../../public/icon/ResIcon";

export default function Footer() {
    return (
        <footer className="bg-black text-white w-full py-10">
            <div className="overflow-hidden whitespace-nowrap border-y border-red-500 bg-red-500 py-4">
                <div className="animate-marquee inline-block text-2xl font-semibold italic">
                    <span className="mx-10">🚀 Fresh fast delivered</span>
                    <span className="mx-10">🚀 Fresh fast delivered</span>
                    <span className="mx-10">🚀 Fresh fast delivered</span>
                    <span className="mx-10">🚀 Fresh fast delivered</span>
                    <span className="mx-10">🚀 Fresh fast delivered</span>
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto mt-10 px-5 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="flex flex-col items-start">
                    <ResIcon className="w-20 h-20" />
                    <h1 className="text-2xl font-bold italic mt-2">
                        Nom<span className="text-red-500">Nom</span>
                    </h1>
                    <p className="text-gray-300">Swift Delivery</p>
                </div>
                <div>
                    <h2 className="text-lg text-gray-400 mb-2">NomNom</h2>
                    <ul className="space-y-1">
                        <li>Home</li>
                        <li>Contact Us</li>
                        <li>Delivery Zone</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg text-gray-400 mb-2">Menu</h2>
                    <div className="grid grid-cols-2 gap-x-6">
                        <ul className="space-y-1">
                            <li>Appetizers</li>
                            <li>Salads</li>
                            <li>Pizzas</li>
                            <li>Main Dishes</li>
                            <li>Desserts</li>
                        </ul>
                        <ul className="space-y-1">
                            <li>Side Dish</li>
                            <li>Brunch</li>
                            <li>Beverages</li>
                            <li>Fish & Seafoods</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg text-gray-400 mb-2">Follow Us</h2>
                    <div className="flex gap-4 text-2xl">
                        <CiFacebook />
                        <RxInstagramLogo />
                    </div>
                </div>
            </div>
        </footer>
    );
} 