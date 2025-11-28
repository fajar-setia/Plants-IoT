import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  Droplet,
  Home,
  Menu,
  X,
  Thermometer,
  BarChart3,
  Settings,
  Sun,
  Wind,
} from "lucide-react";

import Logo from "../../public/logo/logoPlants.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Plants", path: "/plants", icon: Leaf },
    { label: "Moisture", path: "/moisture", icon: Droplet },
    { label: "Temperature", path: "/temperature", icon: Thermometer },
    { label: "Light", path: "/light", icon: Sun },
    { label: "Humidity", path: "/humidity", icon: Wind },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl transition-all duration-500 ease-in-out ${
          isOpen ? "w-72" : "w-20"
        } border-r border-slate-700/50 flex flex-col`}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-700/50">
          <div
            className={`flex items-center overflow-hidden transition-all duration-500 ${
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <img
              src={Logo}
              alt="PlantIoT Logo"
              className="w-22 h-22 object-contain"
            />

            <div>
              <h2 className="text-xl font-bold bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                PlantIoT
              </h2>
              <p className="text-xs text-slate-400">Smart Garden</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl hover:bg-slate-700/50 transition-all duration-300 active:scale-95 ml-auto"
          >
            <div
              className={`transition-transform duration-500 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive(path)
                  ? "bg-linear-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Icon
                size={22}
                className={`shrink-0 transition-transform duration-300 ${
                  isActive(path) ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              <span
                className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-500 ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                {label}
              </span>

              {/* Active indicator */}
              {isActive(path) && isOpen && (
                <div className="ml-auto shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}

              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="absolute left-full ml-6 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap border border-slate-700 z-50">
                  {label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-800" />
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Status indicator */}
        <div className="p-4 border-t border-slate-700/50">
          <div
            className={`flex items-center gap-3 transition-all duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-teal-400 rounded-full animate-ping" />
            </div>
            <div className="text-xs">
              <div className="text-slate-300 font-medium">
                All Systems Online
              </div>
              <div className="text-slate-500">8 devices connected</div>
            </div>
          </div>

          {!isOpen && (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-teal-400 rounded-full animate-ping" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Content offset with smooth transition */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "ml-72" : "ml-20"
        }`}
      />
    </>
  );
}
