import React, { useState } from "react";
import { useUser } from "../provider/UserProvider";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

export const ConfirmAddress = () => {
    const { user, setUser, isConfirmed, setIsConfirmed } = useUser();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const confirmAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        if (!formData.phone.trim() || !formData.address.trim()) {
            setError("Please enter your address and phone number.");
            return;
        }
        try {
            setLoading(true);
            const updatedData = {
                phone: formData.phone,
                address: formData.address,
            };
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            await axios.put("http://localhost:3030/user/information", updatedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser({ ...user, ...updatedData });
            localStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));

            setSuccessMessage(" Information updated successfully");
            setIsConfirmed(true);
        } catch (err: any) {
            setError(err.response?.data?.message || "Server error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start text-sm w-full max-w-md mx-auto bg-white rounded-lg">
            <h3 className="text-l font-bold my-2 w-full text-left">📍 Address Confirmation</h3>
            <form onSubmit={confirmAddress} className="flex flex-col gap-4 w-full">
                <div>
                    <label className="font-bold block mb-1">Phone number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="font-bold block mb-1">Delivery Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                        rows={4}
                        style={{ resize: "none" }}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "🔄 Updating..." : "Update Information"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {successMessage && <p className="text-green-500 mt-2 mx-2 px-4">{successMessage}</p>}
            <div className="mt-4 flex items-center gap-2">
                <Checkbox
                    id="confirm-checkbox"
                    checked={isConfirmed}
                    onCheckedChange={() => setIsConfirmed(!isConfirmed)}
                />
                <label htmlFor="confirm-checkbox" className="text-gray-600">Confirmed Address</label>
            </div>
        </div>
    );
};
