

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Calendar() {
  const [cal, setCal] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const fetch = async () => {
    const res = await API.get("/admin/calendar");
    setCal(res.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    await API.post("/admin/calendar", formData);

    setTitle("");
    setFile(null);
    fetch();
  };

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">Academic Calendar</h2>

      {/* UPLOAD CARD */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload Calendar</h3>

        <div className="grid md:grid-cols-3 gap-4">
          
          <input
            placeholder="Enter Title"
            value={title}
            className="border p-2 rounded focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            className="border p-2 rounded bg-gray-50"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={uploadFile}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded px-4"
          >
            Upload
          </button>

        </div>
      </div>

      {/* CALENDAR FILES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {cal.map((c) => (
          <div
            key={c._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Title */}
            <p className="font-semibold text-lg mb-2">{c.title}</p>

            {/* File Type Badge */}
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
              PDF / Document
            </span>

            {/* Actions */}
            <div className="mt-4">
              <a
                href={c.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                View File
              </a>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}