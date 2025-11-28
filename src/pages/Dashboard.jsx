// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, Thermometer, Sun, Wind, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { plants } from "../lib/dummy";

const icons = { soil: Droplets, temp: Thermometer, light: Sun, hum: Wind };

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(
      Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        soil: 30 + Math.random() * 50,
        temp: 20 + Math.random() * 10,
        light: Math.random() * 100,
        hum: 40 + Math.random() * 40,
      }))
    );
  }, []);

  const stats = plants.reduce(
    (acc, p) => {
      acc.soil += p.soil;
      acc.temp += p.temp;
      acc.light += p.light;
      acc.hum += p.hum;
      return acc;
    },
    { soil: 0, temp: 0, light: 0, hum: 0 }
  );
  const avg = {
    soil: stats.soil / plants.length,
    temp: stats.temp / plants.length,
    light: stats.light / plants.length,
    hum: stats.hum / plants.length,
  };

  const Card = ({ type, value, unit }) => {
    const Icon = icons[type];
    const color = { soil: "text-blue-400", temp: "text-orange-400", light: "text-yellow-400", hum: "text-cyan-400" }[type];
    return (
      <div className="bg-linear-to-br from-slate-800 to-slate-900 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm capitalize">{type}</p>
            <p className={`text-3xl font-bold ${color}`}>
              {value.toFixed(1)}
              <span className="text-lg ml-1">{unit}</span>
            </p>
          </div>
          <Icon className={`${color} w-8 h-8`} />
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card type="soil" value={avg.soil} unit="%" />
        <Card type="temp" value={avg.temp} unit="°C" />
        <Card type="light" value={avg.light} unit="%" />
        <Card type="hum" value={avg.hum} unit="%" />
      </div>

      {/* Chart */}
      <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-4 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Last 24 h Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
            <Line type="monotone" dataKey="soil" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="light" stroke="#eab308" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="hum" stroke="#22d3ee" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick jump */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {["plants", "moisture", "temperature"].map((p) => (
          <Link
            key={p}
            to={`/${p}`}
            className="group bg-slate-800 hover:bg-slate-700/70 p-4 rounded-xl flex items-center justify-between transition"
          >
            <span className="capitalize font-medium">{p}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}