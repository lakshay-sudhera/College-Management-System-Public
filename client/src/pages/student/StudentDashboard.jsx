import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const assignment = () => {
    navigate("/student/assignments");
  };
  const tests = () => {
    navigate("/student/tests");
  };
  const grades = () => {
    navigate("/student/grades");
  };
  const attendance = () => {
    navigate("/student/attendance");
  };
  const progress = () => {
    navigate("/student/progress");
  };
  const [attend, setData] = useState([]);
  const [stats, setStats] = useState({
    avgMarks: 0,
    attendance: 0,
    courses: 0,
  });

  useEffect(() => {
    // You can replace with real APIs later
    const fetchData = async () => {
      try {
        const grades = await API.get("/student/grades");
        API.get("/student/attendance")
          .then(res => setData(res.data))
          .catch(err => console.log(err));        // console.log(grades, attendance);

        const avg =
          grades.data.reduce((acc, g) => acc + g.marks, 0) /
          (grades.data.length || 1);
        // console.log(avg);
        // Calculate attendance %
        // console.log(attend);
        const total = attend.length;
        const present = attend.filter(a => a.status === "present").length;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

        // console.log(percentage);
        setStats({
          avgMarks: avg.toFixed(1),
          attendance: percentage.toFixed(2),
          courses: grades.data.length,
        });


        console.log(stats);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-6">
        Student Dashboard 🎓
      </h2>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <p className="text-gray-600">Average Marks</p>
          <h3 className="text-2xl font-bold mt-2">
            {stats.avgMarks}
          </h3>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <p className="text-gray-600">Attendance</p>
          <h3 className="text-2xl font-bold mt-2">
          {stats.attendance}%
       </h3>
        </div>

        <div className="bg-purple-100 p-6 rounded-xl shadow">
          <p className="text-gray-600">Courses Enrolled</p>
          <h3 className="text-2xl font-bold mt-2">
            {stats.courses}
          </h3>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-5 gap-3 mb-10">

        <button onClick={assignment} className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer">
          📄 Submit Assignment
        </button>

        <button onClick={tests} className="bg-green-500 hover:bg-green-600 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer">
          📝 Take Test
        </button>
        
        <button onClick={progress} className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer">
          📊 View Progress
        </button>
        <button onClick={grades} className="bg-purple-500 hover:bg-purple-600 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer">
          📊 View Grades
        </button>

        <button onClick={attendance} className="bg-pink-500 hover:bg-pink-600 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer">
          📅 View Attendance
        </button>

      </div>

      {/*dummy data */}
      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ Submitted Assignment 1</li>
          <li>📝 Attempted Mid-Term Test</li>
          <li>📊 Grade updated in Math</li>
        </ul>
      </div>

    </div>
  );
}