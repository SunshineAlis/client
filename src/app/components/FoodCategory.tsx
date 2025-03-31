"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryComponent from "@/app/components/CategoryComponent";

export default function FoodCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [foodCountByCategory, setFoodCountByCategory] = useState<{ [categoryId: string]: number }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3030/category");
                if (response.data && Array.isArray(response.data.data)) {
                    const cats: Category[] = response.data.data;
                    setCategories(cats);

                    const counts: { [key: string]: number } = {};
                    await Promise.all(
                        cats.map(async (cat) => {
                            try {
                                const res = await axios.get(`http://localhost:3030/foods/${cat._id}/foodCount`);
                                counts[cat._id] = res.data.count;
                            } catch (err) {
                                console.error(`Error fetching food count for category ${cat._id}:`, err);
                                counts[cat._id] = 0;
                            }
                        })
                    );
                    setFoodCountByCategory(counts);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="">
            {loading ? (
                <p>Loading categories...</p>
            ) : (
                <CategoryComponent categories={categories} foodCountByCategory={foodCountByCategory} />
            )}
        </div>
    );
}
