

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { useEffect, useState } from "react";
import API from "../../services/api";
import { Bar } from "react-chartjs-2";

export default function Analytics() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [studentId, setStudentId] = useState("");
    const [studentData, setStudentData] = useState(null);

    const [chartData, setChartData] = useState(null);

    // Fetch courses
    useEffect(() => {
        API.get("/professor/courses").then((res) => setCourses(res.data));
    }, []);

    // Fetch course analytics
    useEffect(() => {
        if (!selectedCourse) return;

        API.get(`/professor/analytics/advanced/${selectedCourse}`).then((res) => {
            setChartData({
                labels: ["Assignments", "Tests", "Attendance"],
                datasets: [
                    {
                        label: "Course Performance",
                        data: [
                            res.data.averageAssignmentMarks,
                            res.data.averageTestMarks,
                            res.data.attendancePercentage,
                        ],
                        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
                        borderRadius: 8,
                    },
                ],
            });
        });

        API.get(`/professor/students/${selectedCourse}`)
            .then(res => setStudents(res.data));
    }, [selectedCourse]);


    // Student performance
    const getStudentPerformance = async () => {
        const res = await API.get(
            `/professor/analytics/student/${studentId}/${selectedCourse}`
        );
        setStudentData(res.data);
    };

    return (
        <div className="p-4">

            {/* HEADER */}
            <h2 className="text-2xl font-bold mb-6">
                Analytics Dashboard
            </h2>

            {/* COURSE SELECT */}
            <div className="mb-6">
                <select
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="border p-3 rounded w-full md:w-1/3"
                >
                    <option>Select Course</option>
                    {courses.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name} ({c.code})
                        </option>
                    ))}
                </select>
            </div>

            {/* STATS CARDS */}
            {chartData && (
                <div className="grid md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-blue-100 p-4 rounded-xl shadow">
                        <p className="text-sm text-gray-600">Avg Assignment</p>
                        <h3 className="text-xl font-bold">
                            {chartData.datasets[0].data[0]}
                        </h3>
                    </div>

                    <div className="bg-green-100 p-4 rounded-xl shadow">
                        <p className="text-sm text-gray-600">Avg Test</p>
                        <h3 className="text-xl font-bold">
                            {chartData.datasets[0].data[1]}
                        </h3>
                    </div>

                    <div className="bg-yellow-100 p-4 rounded-xl shadow">
                        <p className="text-sm text-gray-600">Attendance %</p>
                        <h3 className="text-xl font-bold">
                            {chartData.datasets[0].data[2]}%
                        </h3>
                    </div>

                </div>
            )}

            {/* CHART */}
            {chartData && (
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <Bar data={chartData} />
                </div>
            )}

            {/* STUDENT PERFORMANCE */}
            <div className="bg-white p-6 rounded-xl shadow">

                <h3 className="text-lg font-semibold mb-4">
                    Student Performance
                </h3>

                <div className="flex flex-col md:flex-row gap-3 mb-4">

                    <select
                        className="border p-2 rounded flex-1"
                        onChange={(e) => {
                            setSelectedStudent(e.target.value);
                            setStudentId(e.target.value); // reuse your existing logic
                        }}
                    >
                        <option>Select Student</option>

                        {students.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name} ({s.email})
                            </option>
                        ))}
                    </select>


                    <button
                        onClick={getStudentPerformance}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Get Performance
                    </button>

                </div>

                {studentData && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">

                        <div className="bg-gray-100 p-4 rounded">
                            <p>Assignment Avg</p>
                            <h4 className="font-bold text-lg">
                                {studentData.averageAssignmentMarks}
                            </h4>
                        </div>

                        <div className="bg-gray-100 p-4 rounded">
                            <p>Test Avg</p>
                            <h4 className="font-bold text-lg">
                                {studentData.averageTestMarks}
                            </h4>
                        </div>

                        <div className="bg-gray-100 p-4 rounded">
                            <p>Attendance</p>
                            <h4 className="font-bold text-lg">
                                {studentData.attendancePercent}%
                            </h4>
                        </div>

                        <div className="bg-gray-100 p-4 rounded">
                            <p>Total Tests</p>
                            <h4 className="font-bold text-lg">
                                {studentData.totalTests}
                            </h4>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}