import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AssignStudents() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [enrolled, setEnrolled] = useState([]);

  // Fetch all courses
  useEffect(() => {
    API.get("/admin/courses").then((res) => setCourses(res.data));
    API.get("/admin/users?role=student").then((res) => setStudents(res.data));
  }, []);

  // Fetch enrolled students
  const fetchEnrolled = async (courseId) => {
    const res = await API.get(`/admin/courses/${courseId}`);
    setEnrolled(res.data.students || []);
  };

  // Add student
  const addStudent = async () => {
    if (!selectedCourse || !selectedStudent) {
      return alert("Select both course and student");
    }

    await API.post("/admin/courses/add-student", {
      courseId: selectedCourse,
      studentId: selectedStudent,
    });

    alert("Student added ✅");
    fetchEnrolled(selectedCourse);
  };

  // Remove student
  const removeStudent = async (studentId) => {
    await API.post("/admin/courses/remove-student", {
      courseId: selectedCourse,
      studentId,
    });

    fetchEnrolled(selectedCourse);
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Assign Students to Course
      </h2>

      {/* SELECT SECTION */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">
        
        {/* Course */}
        <select
          className="border p-2 rounded"
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCourse(value);
            fetchEnrolled(value);
          }}
        >
          <option>Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>

        {/* Student */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option>Select Student</option>
          {students.filter((s)=>(s.role=="student")).map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.email})
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={addStudent}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Add Student
        </button>
      </div>

      {/* ENROLLED STUDENTS TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {enrolled.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium">
                  {s.name}
                </td>

                <td className="p-3">
                  {s.email}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => removeStudent(s._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}