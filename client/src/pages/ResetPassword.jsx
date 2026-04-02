import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      await API.post(`/auth/reset-password/${token}`, { password });
      
      alert("Password reset successful ✅");
      navigate("/");
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
        <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your new password below
        </p>

        {/* Password Input */}
        <input
          type="password"
          placeholder="New Password"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setConfirmPassword(e.target.value)}

        />
        
        {/* Button */}
        <button
          onClick={handleReset}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-200"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}