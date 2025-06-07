import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../config";
import { AuthContext } from './../Context/AuthContext'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const newErrors = {};


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

    return Object.keys(newErrors).length === 0;
  };
  const Submithandle = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setisLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      })
      console.log(result, 'login data')
      setisLoading(false);
      toast.success("Login successful! Please login.");
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error("Login error:", error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <motion.section
      className="px-5 lg:px-0 py-12 bg-gray-50 min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-[570px] mx-auto rounded-xl bg-white shadow-lg p-8 md:p-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h3>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        <form onSubmit={Submithandle} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineMail className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-primaryColor outline-none transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-primaryColor outline-none transition-all duration-200"
              />
            </div>
            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-primaryColor hover:text-primaryColorDark"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-primaryColor hover:bg-primaryColorDark text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <HashLoader size={20} color="#ffffff" className="mr-2" />
                Processing...
              </div>
            ) : (
              "Login"
            )}
          </motion.button>

          <div className="text-center text-sm text-gray-600 pt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primaryColor hover:text-primaryColorDark transition-colors"
            >
              Create account
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
};

export default Login;