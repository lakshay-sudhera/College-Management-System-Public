
import { useState, useEffect } from "react";
import API from "../../services/api";

export default function Assignments() {
  const [form, setForm] = useState({
    title: "",
    courseId: "",
  });

  const [courses, setCourses] = useState([]);

  // Fetch courses
  useEffect(() => {
    API.get("/professor/courses").then((res) => setCourses(res.data));
  }, []);

  const createAssignment = async () => {
    if (!form.title || !form.courseId) {
      return alert("All fields are required");
    }

    try {
      await API.post("/professor/assignments", form);
      alert("Assignment created ✅");

      setForm({
        title: "",
        courseId: "",
      });
    } catch (err) {
      alert("Error creating assignment");
    }
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Create Assignment</h2>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl">
        
        <h3 className="text-lg font-semibold mb-4">
          Assignment Details
        </h3>

        <div className="space-y-4">
          
          {/* Title */}
          <input
            placeholder="Assignment Title"
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

          {/* Button */}
          <button
            onClick={createAssignment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            Create Assignment
          </button>

        </div>
      </div>
    </div>
  );
}