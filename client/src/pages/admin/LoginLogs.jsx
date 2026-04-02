

import { useEffect, useMemo, useState } from "react";
import API from "../../services/api";

export default function LoginLogs() {
  const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    API.get("/admin/login-logs").then((res) => setLogs(res.data));
  }, []);

  const filtered = useMemo(() => {
    if (!query) return logs;
    const q = query.toLowerCase();
    return logs.filter((l) =>
      (l.user?.name || "").toLowerCase().includes(q) ||
      (l.email || "").toLowerCase().includes(q) ||
      (l.ip || "").toLowerCase().includes(q)
    );
  }, [logs, query]);

  const total = logs.length;
  const todayCount = logs.filter((l) => {
    const d = new Date(l.timestamp);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold">Login Logs</h2>

        <input
          placeholder="Search by name, email, IP..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded-lg w-full md:w-80"
        />
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow border">
          <p className="text-gray-500 text-sm">Total Logs</p>
          <h3 className="text-2xl font-semibold">{total}</h3>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border">
          <p className="text-gray-500 text-sm">Today</p>
          <h3 className="text-2xl font-semibold">{todayCount}</h3>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <table className="w-full text-left">
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase sticky top-0">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Login Time</th>
              <th className="p-4">IP Address</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filtered.map((log) => (
              <tr key={log._id} className="border-t hover:bg-gray-50 transition">
                {/* User */}
                <td className="p-4 font-medium">
                  {log.user?.name || "Unknown"}
                </td>

                {/* Email */}
                <td className="p-4">{log.email}</td>

                {/* Time */}
                <td className="p-4 text-sm text-gray-600">
                  {new Date(log.timestamp).toLocaleString()}
                </td>

                {/* IP */}
                <td className="p-4">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {log.ip}
                  </span>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}