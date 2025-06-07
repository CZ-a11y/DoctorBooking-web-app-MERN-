import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Assets
import signupImg from "../assets/images/signup.gif";
import defaultAvatar from "../assets/images/doctor-img01.png";

// Utils
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "patient",
  });

  const [previewURL, setPreviewURL] = useState(defaultAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.role) newErrors.role = "Role is required";

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

    if (!file) return;

    // Validate file
    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      toast.error("File size should be less than 2MB");
      return;
    }

    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setFormData((prev) => ({ ...prev, photo: data.url }));
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image Section */}
          <div className="hidden lg:block bg-primaryColor">
            <figure className="h-full">
              <img
                src={signupImg}
                alt="Signup illustration"
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:pl-12 lg:pr-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Create an <span className="text-primaryColor">account</span>
              </h3>
              <p className="text-gray-600 mt-2">
                Join our community and get started today.
              </p>
            </div>

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
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor ${errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Role and Gender Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Role Field */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    I am a:
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor ${errors.role ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                  )}
                </div>

                {/* Gender Field */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender:
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

                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Photo Upload */}
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <figure className="w-16 h-16 rounded-full border-2 border-primaryColor overflow-hidden">
                    <img
                      src={previewURL}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </figure>
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
                      Choose File
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
                    "Create Account"
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor hover:text-primaryColorDark font-medium"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;