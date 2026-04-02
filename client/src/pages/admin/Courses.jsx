

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    professor: "",
  });

  const fetchCourses = async () => {
    const res = await API.get("/admin/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async () => {
    await API.post("/admin/courses", form);
    setForm({ name: "", code: "", professor: "" });
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await API.delete(`/admin/courses/${id}`);
    fetchCourses();
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>

      {/* CREATE COURSE CARD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Course</h3>

        <div className="grid md:grid-cols-4 gap-3">
          <input
            placeholder="Course Name"
            value={form.name}
            className="border p-2 rounded focus:ring-2 focus:ring-green-400"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Course Code"
            value={form.code}
            className="border p-2 rounded focus:ring-2 focus:ring-green-400"
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />

          <input
            placeholder="Professor ID"
            value={form.professor}
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, professor: e.target.value })
            }
          />

          <button
            onClick={createCourse}
            className="bg-green-500 hover:bg-green-600 text-white rounded px-4"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* COURSES TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        
        <table className="w-full text-left">
          
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Course Name</th>
              <th className="p-3">Code</th>
              <th className="p-3">Professor</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {courses.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.code}</td>
                <td className="p-3">
                  {c.professor?.name || "Not Assigned"}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteCourse(c._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
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