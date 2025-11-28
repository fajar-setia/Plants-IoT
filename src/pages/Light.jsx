// src/pages/Light.jsx
import { useState, useEffect } from "react";
import { Sun } from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import { plants } from "../lib/dummy";

export default function Light() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(plants.map((p) => ({ name: p.name, value: p.light, fill: "#eab308" })));
  }, []);

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex items-center gap-4 mb-6">
        <Sun className="text-yellow-400 w-8 h-8" />
        <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Light Intensity</h1>
      </div>

      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl mb-8">
        <ResponsiveContainer width="100%" height={350}>
          <RadialBarChart innerRadius="20%" outerRadius="80%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar dataKey="value" cornerRadius={10} fill="#eab308" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((d) => (
          <div key={d.name} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-slate-300">{d.name}</span>
            <span className="text-xl font-semibold text-yellow-400">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}