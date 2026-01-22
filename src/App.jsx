import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Plants from "./pages/Plants.jsx";
import Moisture from "./pages/Moisture.jsx";
import Temperature from "./pages/Temperature.jsx";
import Light from "./pages/Light.jsx";
import Humidity from "./pages/Humidity.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <HashRouter>
      <div className="flex">
        <Navbar />
        
        {/* konten */}
        <div className="flex-1 min-h-screen bg-zinc-500 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/moisture" element={<Moisture />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/light" element={<Light />} />
            <Route path="/humidity" element={<Humidity />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
