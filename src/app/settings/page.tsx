"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '../components/provider/UserProvider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";


const Settings: React.FC = () => {
    const { user, setUser } = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        address: '',
        password: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    useEffect(() => {
        const fetchCover = async () => {
            try {
                const res = await axios.get("http://localhost:3030/img/Settings");
                setCoverUrl(res.data.url);
            } catch (error) {
                console.error("Failed to fetch cover image:", error);
            }
        };

        fetchCover();
    }, []);
    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                password: '',
                newPassword: '',
            });
        }
    }, [user]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateForm = () => {
        const passVal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (formData.newPassword && !passVal.test(formData.newPassword)) {
            setError('The new password must contain at least 8 characters, uppercase and lowercase letters, and numbers.');
            return false;
        }
        if (formData.newPassword && formData.newPassword === formData.password) {
            setError('The new password must be different from the old password..');
            return false;
        }
        return true;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            setLoading(true);
            setError('');
            const updatedData = {
                phone: formData.phone,
                address: formData.address,
                ...(formData.password && formData.newPassword && {
                    password: formData.password,
                    newPassword: formData.newPassword,
                }),
            };
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }
            await axios.put(
                'http://localhost:3030/user/information',
                updatedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (user) {
                setUser({ ...user, ...updatedData });
                localStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));
            }
            localStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));

            alert('Information updated successfull!');
            setTimeout(() => {
                router.push("/");
            }, 500);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1200px] w-full mx-auto flex items-center my-40">

            <div className="w-1/2 my-10 px-2 py-10 mx-6 bg-white shadow-md rounded-lg">
                <Button variant="outline"
                    className="mx-10 hover: bg-blue-500" size="icon" onClick={() => router.push("/")}>
                    <ChevronLeft />
                </Button>
                <div className="w-4/5 mx-auto flex flex-col gap-4 py-10">
                    <h1 className="text-2xl font-bold text-gray-900">User information</h1>
                    {loading && <p className="text-gray-600">loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            placeholder="Email"
                            className="border-2 px-4 py-3 rounded-lg bg-gray-100"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone number"
                            className="border-2 px-4 py-3 rounded-lg"
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="border-2 px-4 py-3 rounded-lg"
                        />
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="border-2 px-4 py-3 rounded-lg"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New password (don't must)"
                            className="border-2 px-4 py-3 rounded-lg"
                        />
                        <div className="flex gap-2 items-center">
                            <Checkbox
                                id="show-password"
                                checked={showPassword}
                                onCheckedChange={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="show password" className="text-gray-600">Show password</label>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full text-white bg-blue-600 hover:bg-blue-900 py-3 rounded-lg"
                        >
                            {loading ? 'Хадгалж байна...' : 'Хадгалах'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-[50%]">
                <div className="w-full h-[90%] overflow-hidden rounded-md shadow-md">
                    {coverUrl ? (
                        <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    ) : (
                        <p className="text-center text-gray-500 mt-28">Loading image...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
