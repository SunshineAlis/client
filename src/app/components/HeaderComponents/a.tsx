"use client";

import React, { useState, useEffect } from "react";


export const useCoverImage = () => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCover = async () => {
            try {
                const response = await fetch('/api/covers');
                const data = await response.json();
                if (data.length > 0) {
                    setCoverUrl(data[0].secure_url);
                }
            } catch (error) {
                console.error('Error fetching cover image:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCover();
    }, []);

    return { coverUrl, loading };
};

