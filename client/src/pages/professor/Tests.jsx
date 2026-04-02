
import { useState, useEffect } from "react";
import API from "../../services/api";

export default function Tests() {
  const [form, setForm] = useState({
    title: "",
    courseId: "",
    totalMarks: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/professor/courses").then((res) => setCourses(res.data));
  }, []);

  const createTest = async () => {
    try {
      await API.post("/professor/tests", form);
      alert("Test created successfully ✅");

      setForm({
        title: "",
        courseId: "",
        totalMarks: "",
      });
    } catch (err) {
      alert("Error creating test");
    }
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Create Test</h2>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        
        <h3 className="text-lg font-semibold mb-4">
          New Test Details
        </h3>

        <div className="space-y-4">
          
          {/* Title */}
          <input
            placeholder="Test Title"
            value={form.title}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          {/* Course Dropdown */}
          <select
            value={form.courseId}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, courseId: e.target.value })
            }
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>

          {/* Total Marks */}
          <input
            type="number"
            placeholder="Total Marks"
            value={form.totalMarks}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, totalMarks: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={createTest}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
          >
            Create Test
          </button>

        </div>
      </div>
    </div>
  );
}