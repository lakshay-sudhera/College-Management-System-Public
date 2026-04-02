import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await API.post("/auth/forgot-password", { email });
      alert("Reset link sent to your email 📩");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-87.5 text-center">

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email to receive a reset link
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="mt-4 text-sm">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}