import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get(`/auth/verify-email/${token}`);
        setMessage(res.data.message);
        setStatus("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        setMessage("Invalid or expired link ❌");
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-87.5 text-center">
        
        {/* Icon */}
        <div className="text-4xl mb-4">
          {status === "loading" && "⏳"}
          {status === "success" && "✅"}
          {status === "error" && "❌"}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">
          {status === "loading" && "Verifying Email"}
          {status === "success" && "Email Verified"}
          {status === "error" && "Verification Failed"}
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-4">
          {message}
        </p>

        {/* Redirect info */}
        {status === "success" && (
          <p className="text-xs text-gray-400">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
}