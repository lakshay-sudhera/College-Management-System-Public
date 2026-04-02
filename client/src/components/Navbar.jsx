import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}