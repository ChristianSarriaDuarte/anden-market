// Delimitación geográfica de la cuenca de Santiago
export const SANTIAGO_BOUNDS = [
  [-33.6500, -70.9000], // Suroeste
  [-33.2800, -70.4500]  // Noreste
];

// Configuración general de líneas
export const LINEAS_METRO = [
  { id: "L1", nombre: "Línea 1", color: "#E31B23" },
  { id: "L2", nombre: "Línea 2", color: "#F59C00" },
  { id: "L4", nombre: "Línea 4", color: "#0055A5" },
  { id: "L5", nombre: "Línea 5", color: "#009640" }
];

// Línea 1 completa (27 estaciones con coordenadas para el mapa)
export const ESTACIONES_L1 = [
  { id: 1, nombre: "San Pablo", linea: "L1", coords: [-33.4449, -70.7161] },
  { id: 2, nombre: "Neptuno", linea: "L1", coords: [-33.4475, -70.7093] },
  { id: 3, nombre: "Pajaritos", linea: "L1", coords: [-33.4508, -70.7028] },
  { id: 4, nombre: "Las Rejas", linea: "L1", coords: [-33.4526, -70.6958] },
  { id: 5, nombre: "Ecuador", linea: "L1", coords: [-33.4528, -70.6896] },
  { id: 6, nombre: "San Alberto Hurtado", linea: "L1", coords: [-33.4529, -70.6823] },
  { id: 7, nombre: "Universidad de Santiago", linea: "L1", coords: [-33.4527, -70.6756] },
  { id: 8, nombre: "Estación Central", linea: "L1", coords: [-33.4516, -70.6702] },
  { id: 9, nombre: "Unión Latinoamericana", linea: "L1", coords: [-33.4497, -70.6653] },
  { id: 10, nombre: "República", linea: "L1", coords: [-33.4479, -70.6623] },
  { id: 11, nombre: "Los Héroes", linea: "L1", coords: [-33.4468, -70.6607] },
  { id: 12, nombre: "La Moneda", linea: "L1", coords: [-33.4452, -70.6558] },
  { id: 13, nombre: "Universidad de Chile", linea: "L1", coords: [-33.4443, -70.6508] },
  { id: 14, nombre: "Santa Lucía", linea: "L1", coords: [-33.4429, -70.6455] },
  { id: 15, nombre: "Universidad Católica", linea: "L1", coords: [-33.4402, -70.6397] },
  { id: 16, nombre: "Baquedano", linea: "L1", coords: [-33.4373, -70.6346] },
  { id: 17, nombre: "Salvador", linea: "L1", coords: [-33.4344, -70.6272] },
  { id: 18, nombre: "Manuel Montt", linea: "L1", coords: [-33.4309, -70.6198] },
  { id: 19, nombre: "Pedro de Valdivia", linea: "L1", coords: [-33.4249, -70.6133] },
  { id: 20, nombre: "Los Leones", linea: "L1", coords: [-33.4215, -70.6067] },
  { id: 21, nombre: "Tobalaba", linea: "L1", coords: [-33.4181, -70.6014] },
  { id: 22, nombre: "El Golf", linea: "L1", coords: [-33.4168, -70.5947] },
  { id: 23, nombre: "Alcántara", linea: "L1", coords: [-33.4154, -70.5888] },
  { id: 24, nombre: "Escuela Militar", linea: "L1", coords: [-33.4137, -70.5824] },
  { id: 25, nombre: "Manquehue", linea: "L1", coords: [-33.4076, -70.5673] },
  { id: 26, nombre: "Hernando de Magallanes", linea: "L1", coords: [-33.4072, -70.5552] },
  { id: 27, nombre: "Los Dominicos", linea: "L1", coords: [-33.4069, -70.5436] }
];

// Estaciones representativas de Línea 2
export const ESTACIONES_L2 = [
  { id: 201, nombre: "Vespucio Norte", linea: "L2" },
  { id: 202, nombre: "Cal y Canto", linea: "L2" },
  { id: 203, nombre: "Los Héroes", linea: "L2" },
  { id: 204, nombre: "Toesca", linea: "L2" },
  { id: 205, nombre: "Franklin", linea: "L2" },
  { id: 206, nombre: "La Cisterna", linea: "L2" }
];

// Estaciones representativas de Línea 4
export const ESTACIONES_L4 = [
  { id: 401, nombre: "Tobalaba", linea: "L4" },
  { id: 402, nombre: "Plaza Egaña", linea: "L4" },
  { id: 403, nombre: "Macul", linea: "L4" },
  { id: 404, nombre: "Vicente Valdés", linea: "L4" },
  { id: 405, nombre: "Plaza de Puente Alto", linea: "L4" }
];

// Estaciones representativas de Línea 5
export const ESTACIONES_L5 = [
  { id: 501, nombre: "Plaza de Maipú", linea: "L5" },
  { id: 502, nombre: "San Pablo", linea: "L5" },
  { id: 503, nombre: "Santa Ana", linea: "L5" },
  { id: 504, nombre: "Plaza de Armas", linea: "L5" },
  { id: 505, nombre: "Baquedano", linea: "L5" },
  { id: 506, nombre: "Bellavista de La Florida", linea: "L5" },
  { id: 507, nombre: "Vicente Valdés", linea: "L5" }
];

// Listado unificado para los formularios y buscadores
export const TODAS_LAS_ESTACIONES = [
  ...ESTACIONES_L1,
  ...ESTACIONES_L2,
  ...ESTACIONES_L4,
  ...ESTACIONES_L5
];