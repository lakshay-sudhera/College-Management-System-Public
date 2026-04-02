import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function ProfessorDashboard() {
    const navigate = useNavigate();
    const createTest = () => {
        navigate("/professor/tests");
      };
      const createAssignment = () => {
        navigate("/professor/assignments");
      };
      const attendance = () => {
        navigate("/professor/attendance");
      };
      const analytics = () => {
        navigate("/professor/analytics");
      };
      
    const [stats, setStats] = useState({
        courses: 0,
        assignments: 0,
        tests: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/professor/dashboard"); // create backend if not exists
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
            <h1 className="text-2xl font-bold mb-6">Professor Dashboard</h1>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Courses */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-gray-500 text-sm">My Courses</h2>
                    <p className="text-3xl font-bold text-blue-500 mt-2">
                        {stats.courses}
                    </p>
                </div>

                {/* Students */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-gray-500 text-sm">Assignments Created</h2>
                    <p className="text-3xl font-bold text-green-500 mt-2">
                        {stats.assignments}
                    </p>
                </div>

                {/* Tests */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-gray-500 text-sm">Tests Created</h2>
                    <p className="text-3xl font-bold text-purple-500 mt-2">
                        {stats.tests}
                    </p>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <button onClick={createTest} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg">
                        Create Test
                    </button>

                    <button onClick={createAssignment} className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg">
                        Create Assignment
                    </button>

                    <button onClick={attendance} className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg">
                        Mark Attendance
                    </button>

                    <button onClick={analytics} className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg">
                        View Analytics
                    </button>

                </div>
            </div>

            {/* RECENT SECTION (OPTIONAL)
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p className="text-gray-500 text-sm">
                        No recent activity yet...
                    </p>
                </div>
            </div> */}
        </div>
    );
}