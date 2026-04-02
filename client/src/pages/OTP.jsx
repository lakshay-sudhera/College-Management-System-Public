import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verifyOTP = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      const res = await API.post("/auth/verify-otp", {
        userId,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") navigate("/admin");
      if (res.data.user.role === "professor") navigate("/professor");
      if (res.data.user.role === "student") navigate("/student");

    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-87.5 text-center">
        
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter the OTP sent to your email
        </p>

        {/* OTP Input */}
        <input
          type="text"
          maxLength="6"
          placeholder="Enter 6-digit OTP"
          className="w-full border border-gray-300 p-2 rounded mb-4 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={verifyOTP}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-200"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Optional resend */}
        {/* <p className="text-sm text-gray-500 mt-4">
          Didn't receive OTP?{" "}
          <span className="text-green-500 cursor-pointer hover:underline">
            Resend
          </span>
        </p> */}
      </div>
    </div>
  );
}