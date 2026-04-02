

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Attendance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/student/attendance")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // Calculate attendance %
  const total = data.length;
  const present = data.filter(a => a.status === "present").length;
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  return (
    <div className="p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6">
        Attendance 📅
      </h2>

      {/* SUMMARY CARD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-gray-600">Overall Attendance</p>

        <h3 className="text-3xl font-bold mt-2">
          {percentage}%
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {present} Present / {total} Total
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded mt-3 h-2">
          <div
            className="bg-green-500 h-2 rounded"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
          No attendance data available
        </div>
      ) : (

        /* TABLE */
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-3 bg-gray-100 p-4 font-semibold text-gray-600">
            <span>Course</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {/* ROWS */}
          {data.map((a) => (
            <div
              key={a._id}
              className="grid grid-cols-3 p-4 border-t hover:bg-gray-50 transition"
            >

              {/* COURSE */}
              <span className="font-medium">
                {a.course?.name || "N/A"}
              </span>

              {/* STATUS BADGE */}
              <span>
                {a.status === "present" ? (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                    Present
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                    Absent
                  </span>
                )}
              </span>

              {/* DATE */}
              <span className="text-sm text-gray-500">
                {new Date(a.date).toLocaleDateString()}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}