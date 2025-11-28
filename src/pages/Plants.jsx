// src/pages/Plants.jsx
import { useState } from "react";
import { Droplets, Thermometer, Sun, Wind } from "lucide-react";
import { plants } from "../lib/dummy";

const icons = { soil: Droplets, temp: Thermometer, light: Sun, hum: Wind };

export default function Plants() {
  const [list] = useState(plants);
  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Plants</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {list.map((p) => (
          <div key={p.id} className="bg-slate-800 rounded-2xl p-4 shadow-lg hover:shadow-teal-500/20 transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className={`px-2 py-1 rounded text-xs ${
                p.soil > 50 ? "bg-teal-500/20 text-teal-300" : "bg-orange-500/20 text-orange-300"
              }`}>
                {p.soil > 50 ? "Healthy" : "Thirsty"}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><icons.soil size={16} /> Soil</span>
                <span>{p.soil}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><icons.temp size={16} /> Temp</span>
                <span>{p.temp}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><icons.light size={16} /> Light</span>
                <span>{p.light}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2"><icons.hum size={16} /> Humidity</span>
                <span>{p.hum}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}