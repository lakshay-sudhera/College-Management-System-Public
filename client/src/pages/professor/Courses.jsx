


import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/professor/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      {/* COURSE GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Course Title */}
            <h3 className="text-lg font-semibold mb-2">
              {c.name}
            </h3>

            {/* Course Code */}
            <p className="text-gray-500 text-sm mb-3">
              Code: {c.code}
            </p>

            {/* Badge */}
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              Active Course
            </span>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                View
              </button>

              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                Manage
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}