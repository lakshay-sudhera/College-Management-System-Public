import { Link } from "react-router-dom";

export default function StudentLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-64 h-screen bg-green-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Student Panel</h2>

        <ul className="space-y-3">
          <li><Link to="/student">Dashboard</Link></li>
          <li><Link to="/student/assignments">Assignments</Link></li>
          <li><Link to="/student/tests">Tests</Link></li>
          <li><Link to="/student/grades">Grades</Link></li>
          <li><Link to="/student/attendance">Attendance</Link></li>
          <li><Link to="/student/progress">Progress</Link></li>
          <li><Link to="/student/calendar">Calendar</Link></li>
        </ul>
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}