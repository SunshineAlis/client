"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

export const CoverImage = () => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchCover = async () => {
            try {
                const res = await axios.get("http://localhost:3030/img");
                setCoverUrl(res.data.url);
            } catch (error) {
                console.error("Failed to fetch cover image:", error);
            }
        };

        fetchCover();
    }, []);

    if (!coverUrl) {
        return <p>Loading cover image...</p>;
    }

    return (
        <div className="w-full h-[300px] overflow-hidden rounded-md shadow-md">
            <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        </div>
    );
};
