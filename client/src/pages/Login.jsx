import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);
      localStorage.setItem("userId", res.data.userId);
      navigate("/otp");
    } catch (err) {
      alert("Login failed");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-linear-to-r from-blue-500 to-indigo-600 text-white items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-4">
            College Management System
          </h1>
          <p className="text-lg">
            Manage students, courses, and performance easily 🚀
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-87.5">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Login
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200"
          >
          {loading ? "Sending OTP..." : " LogIn"}
          </button>

          {/* Forgot Password */}
          <p className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}