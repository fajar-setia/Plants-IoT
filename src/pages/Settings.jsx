// src/pages/Settings.jsx
import { useState } from "react";
import { Save, Bell, Moon, Sun, Droplets, Thermometer, SunIcon } from "lucide-react";

export default function Settings() {
  const [dark, setDark] = useState(true);
  const [notif, setNotif] = useState(true);
  const [thresh, setThresh] = useState({ soil: 30, temp: 40, light: 20 });

  const Toggle = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4">
      <span className="text-slate-200">{label}</span>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-teal-500" : "bg-slate-600"
        }`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? "translate-x-6" : ""}`} />
      </button>
    </div>
  );

  const Slider = ({ icon: Icon, label, value, unit, onChange }) => (
    <div className="bg-slate-800 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="text-slate-400" size={20} />
        <span className="text-slate-200">{label}</span>
        <span className="ml-auto text-teal-400 font-semibold">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-teal-500"
      />
    </div>
  );

  return (
    <div className="p-6 text-slate-100 min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <h1 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Settings</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Preferences */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">Preferences</h2>
          <Toggle label="Dark Mode" checked={dark} onChange={() => setDark((d) => !d)} />
          <Toggle label="Push Notifications" checked={notif} onChange={() => setNotif((n) => !n)} />
        </section>

        {/* Thresholds */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-300">Alert Thresholds</h2>
          <Slider icon={Droplets} label="Soil Moisture" value={thresh.soil} unit="%" onChange={(v) => setThresh({ ...thresh, soil: v })} />
          <Slider icon={Thermometer} label="Temperature" value={thresh.temp} unit="°C" onChange={(v) => setThresh({ ...thresh, temp: v })} />
          <Slider icon={SunIcon} label="Light Intensity" value={thresh.light} unit="%" onChange={(v) => setThresh({ ...thresh, light: v })} />
        </section>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button className="px-5 py-2.5 rounded-xl bg-linear-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/30 hover:scale-105 transition">
            <span className="flex items-center gap-2">
              <Save size={18} /> Save Changes
            </span>
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 transition">Reset to Default</button>
        </div>
      </div>
    </div>
  );
}