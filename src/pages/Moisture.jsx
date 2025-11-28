// src/pages/Moisture.jsx
import { useState, useEffect } from "react";
import { Droplets } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { plants } from "../lib/dummy";

export default function Moisture() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(plants.map((p) => ({ name: p.name, soil: p.soil })));
  }, []);

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex items-center gap-4 mb-6">
        <Droplets className="text-blue-400 w-8 h-8" />
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Soil Moisture</h1>
      </div>

      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" unit="%" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} cursor={{ fill: "rgba(59,130,246,.25)" }} />
            <Bar dataKey="soil" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((d) => (
          <div key={d.name} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-slate-300">{d.name}</span>
            <span className="text-xl font-semibold text-blue-400">{d.soil}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}