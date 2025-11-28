// src/pages/Humidity.jsx
import { useState, useEffect } from "react";
import { Wind } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { plants } from "../lib/dummy";

export default function Humidity() {
  const [hist, setHist] = useState([]);
  useEffect(() => {
    setHist(
      Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        hum: 35 + Math.random() * 45, // 35-80 %
      }))
    );
  }, []);

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex items-center gap-4 mb-6">
        <Wind className="text-cyan-400 w-8 h-8" />
        <h1 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">Humidity</h1>
      </div>

      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl mb-8">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={hist}>
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" unit="%" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
            <Area type="monotone" dataKey="hum" stroke="#22d3ee" fill="url(#humGrad)" strokeWidth={2} />
            <defs>
              <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plants.map((p) => (
          <div key={p.id} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-slate-300">{p.name}</span>
            <span className="text-xl font-semibold text-cyan-400">{p.hum}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}