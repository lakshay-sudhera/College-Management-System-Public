
import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Grades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    API.get("/student/grades")
      .then(res => setGrades(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6">
        My Grades 📊
      </h2>

      {/* EMPTY STATE */}
      {grades.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
          No grades available yet
        </div>
      ) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-4 bg-gray-100 p-4 font-semibold text-gray-600">
            <span>Course</span>
            <span>Type</span>
            <span>Title/TestId</span>
            <span>Marks</span>
          </div>

          {/* TABLE BODY */}
          {grades.map((g) => (
            <div
              key={g._id}
              className="grid grid-cols-4 p-4 border-t hover:bg-gray-50 transition"
            >

              {/* COURSE */}
              <span className="font-medium">
                {g.course?.name || "N/A"}
              </span>

              {/* TYPE BADGE */}

              <span>
                {g.assignment ? (
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                    Assignment
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                    Test
                  </span>
                )}
              </span>

              {/* TITLE */}
              <span>
                {g.assignment || g.test}
              </span>

              {/* MARKS */}

              <span className={`font-semibold 
                  ${g.marks > 70 ? "text-green-600" :
                  g.marks > 50 ? "text-yellow-500" :
                    "text-red-500"}`}>
                {g.marks || 0}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}