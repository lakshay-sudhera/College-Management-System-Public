import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 bg-gray-100 min-h-screen">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}