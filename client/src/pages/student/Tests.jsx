

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [testId, setTestId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tests
  useEffect(() => {
    API.get("/student/tests")
      .then((res) => setTests(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submit = async () => {
    if (!testId || !file) {
      return alert("Please select test and upload file");
    }

    const formData = new FormData();
    formData.append("testId", testId);
    formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/student/tests/submit", formData);
      alert("Test submitted successfully ✅");

      // Reset
      setTestId("");
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
          Submit Test 📝
        </h2>

        {/* TEST DROPDOWN */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Select Test
          </label>

          <select
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Test</option>

            {tests.map((t) => (
              <option key={t._id} value={t._id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Upload Answer File
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
          disabled={!testId || !file || loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {loading ? "Submitting..." : "Submit Test"}
        </button>

      </div>
    </div>
  );
}