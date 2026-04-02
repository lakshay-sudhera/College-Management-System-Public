

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Calendar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/student/calendar").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">
        Academic Calendar
      </h2>

      {/* Empty State */}
      {data.length === 0 && (
        <p className="text-gray-500">No calendar uploaded yet</p>
      )}

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {data.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
          >
            {/* Title */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {c.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                Academic document uploaded by admin
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              
              {/* View */}
              <a
                href={c.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
              >
                View
              </a>

              {/* Download */}
              <a
                href={c.fileUrl}
                download
                className="flex-1 text-center bg-gray-200 hover:bg-gray-300 py-2 rounded transition"
              >
                Download
              </a>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}