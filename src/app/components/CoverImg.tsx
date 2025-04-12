"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type imageProps = {
    page?: string;
    className?: string;
};

export const CoverImage = ({ page, className }: imageProps) => {
    const [url, setUrl] = useState<string | null>(null);
    const API_URL = "https://service-jus0.onrender.com";
    useEffect(() => {
        const fetchImage = async () => {
            if (!page) {
                setUrl("/BG.png");
                return;
            }
            try {
                const res = await axios.get(`${API_URL}/img/${page}`);
                setUrl(res.data.url);
            } catch (err) {
                console.error("Failed to fetch image:", err);
                setUrl("/login.jpg");
            }
        };
        fetchImage();
    }, [page]);

    if (!url) {
        return <div className="w-full h-64 bg-gray-200 animate-pulse" />;
    }

    return (
        <img
            src={url}
            alt={`${page || "default"} cover`}
            className={`w - full h - 64 object - cover rounded - lg shadow ${className} `}
        />
    );
};