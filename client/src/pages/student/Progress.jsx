

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from "chart.js";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  import { useEffect, useState } from "react";
  import API from "../../services/api";
  import { Bar } from "react-chartjs-2";
  
  export default function Progress() {
    const [chartData, setChartData] = useState(null);
    const [stats, setStats] = useState({
      assignment: 0,
      test: 0,
      attendance: 0,
    });
  
    useEffect(() => {
      API.get("/student/progress").then(res => {
        const a = res.data.averageAssignmentMarks || 0;
        const t = res.data.averageTestMarks || 0;
        const att = res.data.attendancePercent || 0;
  
        setStats({
          assignment: a.toFixed(1),
          test: t.toFixed(1),
          attendance: att.toFixed(1),
        });
  
        setChartData({
          labels: ["Assignments", "Tests", "Attendance"],
          datasets: [
            {
              label: "My Performance",
              data: [a, t, att],
              backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
              borderRadius: 6,
            },
          ],
        });
      });
    }, []);
  
    return (
      <div className="p-6">
  
        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6">
          My Progress 📈
        </h2>
  
        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
  
          <div className="bg-blue-100 p-5 rounded-xl shadow">
            <p className="text-gray-600">Avg Assignment</p>
            <h3 className="text-2xl font-bold mt-2">
              {stats.assignment}
            </h3>
          </div>
  
          <div className="bg-green-100 p-5 rounded-xl shadow">
            <p className="text-gray-600">Avg Test</p>
            <h3 className="text-2xl font-bold mt-2">
              {stats.test}
            </h3>
          </div>
  
          <div className="bg-yellow-100 p-5 rounded-xl shadow">
            <p className="text-gray-600">Attendance</p>
            <h3 className="text-2xl font-bold mt-2">
              {stats.attendance}%
            </h3>
          </div>
  
        </div>
  
        {/* CHART CARD */}
        <div className="bg-white p-6 rounded-xl shadow">
  
          <h3 className="font-semibold mb-4">
            Performance Overview
          </h3>
  
          {chartData ? (
            <Bar
              key={JSON.stringify(chartData)}
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          ) : (
            <p className="text-gray-500">Loading chart...</p>
          )}
  
        </div>
  
      </div>
    );
  }