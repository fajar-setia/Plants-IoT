// src/lib/dummy.js
export const plants = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: ["Tomat", "Basil", "Mint", "Sage", "Parsley", "Thyme", "Oregano", "Rosella"][i],
  soil: 20 + Math.floor(Math.random() * 60), // %
  temp: 18 + Math.floor(Math.random() * 15), // °C
  light: Math.floor(Math.random() * 100),    // %
  hum: 40 + Math.floor(Math.random() * 40),  // %
}));