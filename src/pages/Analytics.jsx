// src/pages/Analytics.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { plants } from "../lib/dummy";

const COLORS = ["#3b82f6", "#f97316", "#eab308", "#22d3ee"];

export default function Analytics() {
  const [day, setDay] = useState([]);
  const [pie, setPie] = useState([]);

  useEffect(() => {
    // 7 hari dummy
    const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    setDay(
      week.map((d) => ({
        name: d,
        soil: 30 + Math.random() * 50,
        temp: 20 + Math.random() * 10,
      })),
    );
    // pie % healthy
    const healthy = plants.filter((p) => p.soil > 50).length;
    setPie([
      { name: "Healthy", value: healthy },
      { name: "Dry", value: plants.length - healthy },
    ]);
  }, []);

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
        Analytics
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar mingguan */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Weekly Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={day}>
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
              />
              <Bar dataKey="soil" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="temp" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie health */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Plant Health</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pie.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  color: "#000",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Correlation line */}
      <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Soil vs Temp Correlation</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={plants}>
            <XAxis dataKey="soil" stroke="#64748b" unit="%" />
            <YAxis stroke="#64748b" unit="°C" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
