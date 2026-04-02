
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Attendance() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [attendance, setAttendance] = useState({});

  // Fetch courses
  useEffect(() => {
    API.get("/professor/courses").then((res) => setCourses(res.data));
  }, []);

  // Fetch students of selected course
  const fetchStudents = async () => {
    const res = await API.get(`/professor/students/${courseId}`);
    setStudents(res.data);
  };

  // Submit attendance
  const submitAttendance = async () => {
    // console.log(attendance);
    const data = Object.keys(attendance).map((studentId) => ({
      courseId,
      studentId,
      status: attendance[studentId],
    }));
    // console.log(data);
    
    await API.post("/professor/attendance/bulk", data);
    alert("Attendance submitted ✅");
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>

      {/* COURSE SELECT */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 flex gap-4">
        
        <select
          className="border p-2 rounded"
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option>Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={fetchStudents}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
        >
          Load Students
        </button>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-t">

                <td className="p-3 font-medium">
                  {s.name}
                </td>

                <td className="p-3">
                  {s.email}
                </td>

                <td className="p-3">
                  <select
                    className="border p-1 rounded"
                    value={attendance[s._id] || "present"}
                    onChange={(e) =>
                      setAttendance((prev) => ({
                        ...prev,
                        [s._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SUBMIT BUTTON */}
      {students.length > 0 && (
        <button
          onClick={submitAttendance}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit Attendance
        </button>
      )}
    </div>
  );
}