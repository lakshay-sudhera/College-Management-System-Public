import { Link } from "react-router-dom";

export default function ProfessorLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-64 h-screen bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Professor Panel</h2>

        <ul className="space-y-3">
          <li><Link to="/professor">Dashboard</Link></li>
          <li><Link to="/professor/courses">Courses</Link></li>
          <li><Link to="/professor/assignments">Assignments</Link></li>
          <li><Link to="/professor/tests">Tests</Link></li>
          <li><Link to="/professor/test-evaluation">Test Evaluation</Link></li>
          <li><Link to="/professor/assignment-evaluation">  Assignment Evaluation</Link></li>
          <li><Link to="/professor/analytics">Analytics</Link></li>
          <li><Link to="/professor/attendance">Attendance</Link></li>
          <li><Link to="/professor/calendar">Calendar</Link></li>
         
        </ul>
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
}