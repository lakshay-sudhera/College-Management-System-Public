
import { useState } from "react";
import API from "../../services/api";

export default function Assignments() {
  const [assignmentId, setAssignmentId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!assignmentId || !file) {
      return alert("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/student/assignments/submit", formData);
      alert("Assignment submitted successfully ✅");

      // Reset
      setAssignmentId("");
      setFile(null);
    } catch (err) {
      alert("Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Submit Assignment 📄
        </h2>

        {/* ASSIGNMENT ID */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Assignment ID
          </label>
          <input
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
            placeholder="Enter assignment ID"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Upload File
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
            
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="fileUpload" className="cursor-pointer">
              <p className="text-gray-500">
                Click to upload or drag file here
              </p>

              {file && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {file.name}
                </p>
              )}
            </label>

          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition 
            ${loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>

      </div>
    </div>
  );
}