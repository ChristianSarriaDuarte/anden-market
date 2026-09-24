// Delimitación geográfica de la cuenca de Santiago
export const SANTIAGO_BOUNDS = [
  [-33.6500, -70.9000],
  [-33.2800, -70.4500]
];

export const LINEAS_METRO = [
  { id: "L1", nombre: "Línea 1", color: "#E31B23" },
  { id: "L2", nombre: "Línea 2", color: "#F59C00" },
  { id: "L4", nombre: "Línea 4", color: "#0055A5" },
  { id: "L5", nombre: "Línea 5", color: "#009640" }
];

// Catálogo único de estaciones físicas (PostgreSQL-ready: cada estación existe una sola vez)
export const TODAS_LAS_ESTACIONES = [
  // --- LÍNEA 1 (con coordenadas para el mapa) ---
  { id: 1, nombre: "San Pablo", lineas: ["L1", "L5"], coords: [-33.4449, -70.7161] },
  { id: 2, nombre: "Neptuno", lineas: ["L1"], coords: [-33.4475, -70.7093] },
  { id: 3, nombre: "Pajaritos", lineas: ["L1"], coords: [-33.4508, -70.7028] },
  { id: 4, nombre: "Las Rejas", lineas: ["L1"], coords: [-33.4526, -70.6958] },
  { id: 5, nombre: "Ecuador", lineas: ["L1"], coords: [-33.4528, -70.6896] },
  { id: 6, nombre: "San Alberto Hurtado", lineas: ["L1"], coords: [-33.4529, -70.6823] },
  { id: 7, nombre: "Universidad de Santiago", lineas: ["L1"], coords: [-33.4527, -70.6756] },
  { id: 8, nombre: "Estación Central", lineas: ["L1"], coords: [-33.4516, -70.6702] },
  { id: 9, nombre: "Unión Latinoamericana", lineas: ["L1"], coords: [-33.4497, -70.6653] },
  { id: 10, nombre: "República", lineas: ["L1"], coords: [-33.4479, -70.6623] },
  { id: 11, nombre: "Los Héroes", lineas: ["L1", "L2"], coords: [-33.4468, -70.6607] },
  { id: 12, nombre: "La Moneda", lineas: ["L1"], coords: [-33.4452, -70.6558] },
  { id: 13, nombre: "Universidad de Chile", lineas: ["L1"], coords: [-33.4443, -70.6508] },
  { id: 14, nombre: "Santa Lucía", lineas: ["L1"], coords: [-33.4429, -70.6455] },
  { id: 15, nombre: "Universidad Católica", lineas: ["L1"], coords: [-33.4402, -70.6397] },
  { id: 16, nombre: "Baquedano", lineas: ["L1", "L5"], coords: [-33.4373, -70.6346] },
  { id: 17, nombre: "Salvador", lineas: ["L1"], coords: [-33.4344, -70.6272] },
  { id: 18, nombre: "Manuel Montt", lineas: ["L1"], coords: [-33.4309, -70.6198] },
  { id: 19, nombre: "Pedro de Valdivia", lineas: ["L1"], coords: [-33.4249, -70.6133] },
  { id: 20, nombre: "Los Leones", lineas: ["L1"], coords: [-33.4215, -70.6067] },
  { id: 21, nombre: "Tobalaba", lineas: ["L1", "L4"], coords: [-33.4181, -70.6014] },
  { id: 22, nombre: "El Golf", lineas: ["L1"], coords: [-33.4168, -70.5947] },
  { id: 23, nombre: "Alcántara", lineas: ["L1"], coords: [-33.4154, -70.5888] },
  { id: 24, nombre: "Escuela Militar", lineas: ["L1"], coords: [-33.4137, -70.5824] },
  { id: 25, nombre: "Manquehue", lineas: ["L1"], coords: [-33.4076, -70.5673] },
  { id: 26, nombre: "Hernando de Magallanes", lineas: ["L1"], coords: [-33.4072, -70.5552] },
  { id: 27, nombre: "Los Dominicos", lineas: ["L1"], coords: [-33.4069, -70.5436] },

  // --- LÍNEA 2 (Estaciones propias sin duplicar Los Héroes) ---
  { id: 201, nombre: "Vespucio Norte", lineas: ["L2"] },
  { id: 202, nombre: "Cal y Canto", lineas: ["L2"] },
  { id: 203, nombre: "Toesca", lineas: ["L2"] },
  { id: 204, nombre: "Franklin", lineas: ["L2"] },
  { id: 205, nombre: "La Cisterna", lineas: ["L2"] },

  // --- LÍNEA 4 (Estaciones propias sin duplicar Tobalaba) ---
  { id: 401, nombre: "Plaza Egaña", lineas: ["L4"] },
  { id: 402, nombre: "Macul", lineas: ["L4"] },
  { id: 403, nombre: "Vicente Valdés", lineas: ["L4", "L5"] },
  { id: 404, nombre: "Plaza de Puente Alto", lineas: ["L4"] },

  // --- LÍNEA 5 (Estaciones propias sin duplicar Baquedano, San Pablo ni Vicente Valdés) ---
  { id: 501, nombre: "Plaza de Maipú", lineas: ["L5"] },
  { id: 502, nombre: "Santa Ana", lineas: ["L5"] },
  { id: 503, nombre: "Plaza de Armas", lineas: ["L5"] },
  { id: 504, nombre: "Bellavista de La Florida", lineas: ["L5"] }
];

// Compatibilidad con el mapa (Línea 1 completa con coords)
export const ESTACIONES_L1 = TODAS_LAS_ESTACIONES.filter(e => e.lineas.includes("L1") && e.coords);