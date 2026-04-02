import { Link } from "react-router-dom";

export default function Sidebar() {
    const role = localStorage.getItem("role");

    return (
        <div className="w-64 h-auto bg-gray-900 text-white p-5">

            <h2 className="text-2xl font-bold mb-6">CMS</h2>

            <ul className="space-y-4">

                {/* COMMON */}
                {/* <li>
                    <Link to="" className="hover:text-gray-300">Dashboard</Link>
                </li> */}

                {/* ADMIN */}
                {role === "admin" && (
                    <>  <li>
                        <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
                    </li>
                        <li><Link to="/admin/users">Users</Link></li>
                        <li><Link to="/admin/courses">Courses</Link></li>
                        <li><Link to="/admin/calendar">Calendar</Link></li>
                        <li><Link to="/admin/logs">Login Logs</Link></li>
                        <li><Link to="/admin/assign-students">Assign Students</Link></li>
                    </>
                )}

                {/* PROFESSOR */}
                {role === "professor" && (
                    <><li>
                    <Link to="/professor" className="hover:text-gray-300">Dashboard</Link>
                </li>
                        <li><Link to="/professor/courses">Courses</Link></li>
                        <li><Link to="/professor/assignments">Assignments</Link></li>
                        <li><Link to="/professor/tests">Tests</Link></li>
                        <li><Link to="/professor/test-evaluation">Test Evaluation</Link></li>
                        <li><Link to="/professor/assignment-evaluation">  Assignment Evaluation</Link></li>
                        <li><Link to="/professor/analytics">Analytics</Link></li>
                        <li><Link to="/professor/attendance">Attendance</Link></li>
                        <li><Link to="/professor/calendar">Calendar</Link></li>
                    </>
                )}

                {/* STUDENT */}
                {role === "student" && (
                    <><li>
                    <Link to="/student" className="hover:text-gray-300">Dashboard</Link>
                </li>
                        <li><Link to="/student/assignments">Assignments</Link></li>
                        <li><Link to="/student/tests">Tests</Link></li>
                        <li><Link to="/student/grades">Grades</Link></li>
                        <li><Link to="/student/attendance">Attendance</Link></li>
                        <li><Link to="/student/progress">Progress</Link></li>
                        <li><Link to="/student/calendar">Calendar</Link></li>
                    </>
                )}

            </ul>
        </div>
    );
}