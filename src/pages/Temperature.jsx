// src/pages/Temperature.jsx
import { useState, useEffect } from "react";
import { Thermometer } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { plants } from "../lib/dummy";

export default function Temperature() {
  const [hist, setHist] = useState([]);
  useEffect(() => {
    setHist(
      Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        temp: 18 + Math.random() * 15,
      }))
    );
  }, []);

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex items-center gap-4 mb-6">
        <Thermometer className="text-orange-400 w-8 h-8" />
        <h1 className="text-3xl font-bold bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Temperature</h1>
      </div>

      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl mb-8">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={hist}>
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" unit="°C" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
            <Area type="monotone" dataKey="temp" stroke="#f97316" fill="url(#tempGrad)" strokeWidth={2} />
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plants.map((p) => (
          <div key={p.id} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-slate-300">{p.name}</span>
            <span className="text-xl font-semibold text-orange-400">{p.temp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}