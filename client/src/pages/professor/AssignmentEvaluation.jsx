

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AssignmentEvaluation() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [assignmentId, setAssignmentId] = useState("");

  const [submissions, setSubmissions] = useState([]);
  const [marks, setMarks] = useState({});

  // Fetch courses
  useEffect(() => {
    API.get("/professor/courses").then((res) => setCourses(res.data));
  }, []);

  // Fetch assignments based on course
  useEffect(() => {
    if (courseId) {
      API.get(`/professor/assignments/${courseId}`)
        .then((res) => setAssignments(res.data));
    }
  }, [courseId]);

  // Fetch submissions
  const fetchSubmissions = async () => {
    const res = await API.get(
      `/professor/assignments/${assignmentId}/${courseId}/submissions`
    );
    setSubmissions(res.data);
  };

  // Evaluate
  const evaluate = async (studentId) => {
    await API.post("/professor/assignments/evaluate", {
      assignmentId,
      courseId,
      studentId,
      marks: marks[studentId],
    });

    await API.post("/professor/assignments/grades", {
      courseId,
      studentId,
      assignment: assignmentId,
      marks: marks[studentId],
    });

    alert("Evaluated ✅");
    fetchSubmissions();
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Assignment Evaluation
      </h2>

      {/* FILTER SECTION */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 grid md:grid-cols-3 gap-4">
        
        {/* Course */}
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

        {/* Assignment */}
        <select
          className="border p-2 rounded"
          onChange={(e) => setAssignmentId(e.target.value)}
        >
          <option>Select Assignment</option>
          {assignments.map((a) => (
            <option key={a._id} value={a._id}>
              {a.title}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={fetchSubmissions}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Load Submissions
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Email</th>
              <th className="p-3">Submission</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">

                {/* Name */}
                <td className="p-3 font-medium">
                  {s.student?.name}
                </td>

                {/* Email */}
                <td className="p-3">
                  {s.student?.email}
                </td>

                {/* File */}
                <td className="p-3">
                  <a
                    href={s.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View File
                  </a>
                </td>

                {/* Marks */}
                <td className="p-3">
                  <input
                    type="number"
                    className="border p-1 rounded w-20"
                    value={marks[s.student?._id] || ""}
                    onChange={(e) =>
                      setMarks({
                        ...marks,
                        [s.student._id]: e.target.value,
                      })
                    }
                  />
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      s.evaluated
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {s.evaluated ? "Pending" : "Evaluated"}
                  </span>
                </td>

                {/* Action */}
                <td className="p-3 text-center">
                  <button
                    disabled={s.evaluated}
                    onClick={() => evaluate(s.student._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
                  >
                    Evaluate
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