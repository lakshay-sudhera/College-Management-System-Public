
import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const addUser = () => {
    navigate("/admin/users");
  };
  const addCourse = () => {
    navigate("/admin/courses");
  };

  const [stats, setStats] = useState({
    students: 0,
    professors: 0,
    courses: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard"); // create this API if not
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Students */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Students</h2>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            {stats.students}
          </p>
        </div>

        {/* Professors */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Professors</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {stats.professors}
          </p>
        </div>

        {/* Courses */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Courses</h2>
          <p className="text-3xl font-bold text-purple-500 mt-2">
            {stats.courses}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <button onClick={addUser} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg">
            Add Student
          </button>

          <button onClick={addUser} className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg">
            Add Professor
          </button>

          <button onClick={addCourse} className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg">
            Add Course
          </button>

        </div>
      </div>
    </div>
  );
}