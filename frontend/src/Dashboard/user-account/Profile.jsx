import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
// Utils
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config"

const Profile = ({ user }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photo: null,
        gender: "",
        bloodType: "",
    });

    const [selectedFile, setSelectedFile] = useState(null); // Added missing state
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                photo: user.photo || null,
                gender: user.gender || "",
                bloodType: user.bloodType || ""
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.gender) newErrors.gender = "Gender is required";
        // Removed password validation since it's not in the form

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // Update selected file state

        if (!file) return;

        // Validate file
        if (file.size > 2 * 1024 * 1024) {
            // 2MB limit
            toast.error("File size should be less than 2MB");
            return;
        }

        try {
            setIsLoading(true);
            const data = await uploadImageToCloudinary(file);
            setFormData((prev) => ({ ...prev, photo: data.url }));
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload image");
            console.error("Upload error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Update failed");
            }

            toast.success("Update Successful");
            navigate("/users/profile/me");
        } catch (error) {
            toast.error(error.message || "Something went wrong");
            console.error("Update error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="john@example.com"
                            readOnly
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Blood Type Field */}
                    <div>
                        <label
                            htmlFor="bloodType"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Blood Type
                        </label>
                        <input
                            type="text"
                            id="bloodType"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor ${errors.bloodType ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Example: A+"
                        />
                        {errors.bloodType && (
                            <p className="mt-1 text-sm text-red-500">{errors.bloodType}</p>
                        )}
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor ${errors.gender ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                        {errors.gender && (
                            <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                        )}
                    </div>

                    {/* Photo Upload */}
                    <div className="flex items-center gap-4">
                        <div className="shrink-0">
                            {formData.photo ? (
                                <figure className="w-16 h-16 rounded-full border-2 border-primaryColor overflow-hidden">
                                    <img
                                        src={formData.photo}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                </figure>
                            ) : (
                                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                    <span className="text-gray-400">No photo</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Photo (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <label
                                    htmlFor="photo"
                                    className="block w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors"
                                >
                                    {selectedFile ? selectedFile.name : 'Upload photo'}
                                </label>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                JPG, PNG (Max 2MB)
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primaryColor hover:bg-primaryColorDark text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <HashLoader size={20} color="#ffffff" className="mr-2" />
                                    Processing...
                                </div>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile