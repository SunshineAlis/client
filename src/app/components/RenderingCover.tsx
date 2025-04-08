"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const RenderingCover = () => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [isLoadingCover, setIsLoadingCover] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCover = async () => {
            try {
                setIsLoadingCover(true);
                const res = await axios.get("http://localhost:3030/img/FoodClient");
                if (res.data?.url) {
                    setCoverUrl(res.data.url);
                } else {
                    setError("No cover image available.");
                }
            } catch (error) {
                console.error("Failed to fetch cover image:", error);
                setError("Failed to load the cover image. Please try again later.");
            } finally {
                setIsLoadingCover(false);
            }
        };

        fetchCover();
    }, []);

    return (
        <div className="max-w-[1200px] m-auto h-[300px] overflow-hidden rounded-md shadow-md bg-gray-200">
            {isLoadingCover ? (
                <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">Loading image...</p>
                </div>
            ) : error ? (
                <div className="h-full flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : coverUrl ? (
                <img
                    src={coverUrl}
                    alt="Food cover"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">No cover image available</p>
                </div>
            )}
        </div>
    );
};
