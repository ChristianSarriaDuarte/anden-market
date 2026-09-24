// Delimitación geográfica de la cuenca de Santiago
export const SANTIAGO_BOUNDS = [
  [-33.6500, -70.9000],
  [-33.2800, -70.4500]
];

export const LINEAS_METRO = [
  { id: "L1", nombre: "Línea 1", color: "#E31B23" },
  { id: "L2", nombre: "Línea 2", color: "#F5A623" },
  { id: "L3", nombre: "Línea 3", color: "#7D5836" },
  { id: "L4", nombre: "Línea 4", color: "#0055A5" },
  { id: "L4A", nombre: "Línea 4A", color: "#00AEEF" },
  { id: "L5", nombre: "Línea 5", color: "#009640" },
  { id: "L6", nombre: "Línea 6", color: "#6A2A82" }
];

export const TODAS_LAS_ESTACIONES = [
  // ==========================================
  // LÍNEA 1 (Poniente a Oriente - Coordenadas OSM Reales)
  // ==========================================
  { id: 1, nombre: "San Pablo", lineas: ["L1", "L5"], coords: [-33.4442204, -70.7232488] },
  { id: 2, nombre: "Neptuno", lineas: ["L1"], coords: [-33.4515804, -70.7226828] },
  { id: 3, nombre: "Pajaritos", lineas: ["L1"], coords: [-33.4574748, -70.7154469] },
  { id: 4, nombre: "Las Rejas", lineas: ["L1"], coords: [-33.4575386, -70.7067561] },
  { id: 5, nombre: "Ecuador", lineas: ["L1"], coords: [-33.4559226, -70.6997325] },
  { id: 6, nombre: "San Alberto Hurtado", lineas: ["L1"], coords: [-33.4542019, -70.6922721] },
  { id: 7, nombre: "Universidad de Santiago", lineas: ["L1"], coords: [-33.4528554, -70.6865552] },
  { id: 8, nombre: "Estación Central", lineas: ["L1"], coords: [-33.4508228, -70.6789622] },
  { id: 9, nombre: "Unión Latinoamericana", lineas: ["L1"], coords: [-33.4493623, -70.6733510] },
  { id: 10, nombre: "República", lineas: ["L1"], coords: [-33.4477020, -70.6671366] },
  { id: 11, nombre: "Los Héroes", lineas: ["L1", "L2"], coords: [-33.4461853, -70.6604458] },
  { id: 12, nombre: "La Moneda", lineas: ["L1"], coords: [-33.4448711, -70.6548709] },
  { id: 13, nombre: "Universidad de Chile", lineas: ["L1", "L3"], coords: [-33.4438670, -70.6506654] },
  { id: 14, nombre: "Santa Lucía", lineas: ["L1"], coords: [-33.4424649, -70.6447442] },
  { id: 15, nombre: "Universidad Católica", lineas: ["L1"], coords: [-33.4397617, -70.6398924] },
  { id: 16, nombre: "Baquedano", lineas: ["L1", "L5"], coords: [-33.4372174, -70.6334109] },
  { id: 17, nombre: "Salvador", lineas: ["L1"], coords: [-33.4327195, -70.6260885] },
  { id: 18, nombre: "Manuel Montt", lineas: ["L1"], coords: [-33.4285532, -70.6196465] },
  { id: 19, nombre: "Pedro de Valdivia", lineas: ["L1"], coords: [-33.4254830, -70.6137959] },
  { id: 20, nombre: "Los Leones", lineas: ["L1", "L6"], coords: [-33.4220190, -70.6085607] },
  { id: 21, nombre: "Tobalaba", lineas: ["L1", "L4"], coords: [-33.4182154, -70.6014872] },
  { id: 22, nombre: "El Golf", lineas: ["L1"], coords: [-33.4166189, -70.5957077] },
  { id: 23, nombre: "Alcántara", lineas: ["L1"], coords: [-33.4154469, -70.5899906] },
  { id: 24, nombre: "Escuela Militar", lineas: ["L1"], coords: [-33.4134817, -70.5826796] },
  { id: 25, nombre: "Manquehue", lineas: ["L1"], coords: [-33.4094637, -70.5697326] },
  { id: 26, nombre: "Hernando de Magallanes", lineas: ["L1"], coords: [-33.4079352, -70.5558454] },
  { id: 27, nombre: "Los Dominicos", lineas: ["L1"], coords: [-33.4078854, -70.5449939] },

  // ==========================================
  // LÍNEA 2 (Norte a Sur - Con Extensión a San Bernardo)
  // ==========================================
  { id: 201, nombre: "Vespucio Norte", lineas: ["L2"], coords: [-33.3807538, -70.6463404] },
  { id: 202, nombre: "Zapadores", lineas: ["L2"], coords: [-33.3909444, -70.6424385] },
  { id: 203, nombre: "Dorsal", lineas: ["L2"], coords: [-33.3969616, -70.6427404] },
  { id: 204, nombre: "Einstein", lineas: ["L2"], coords: [-33.4059459, -70.6431738] },
  { id: 205, nombre: "Cementerios", lineas: ["L2"], coords: [-33.4139806, -70.6435970] },
  { id: 206, nombre: "Cerro Blanco", lineas: ["L2"], coords: [-33.4227505, -70.6450582] },
  { id: 207, nombre: "Patronato", lineas: ["L2"], coords: [-33.4297317, -70.6471183] },
  { id: 208, nombre: "Puente Cal y Canto", lineas: ["L2", "L3"], coords: [-33.4328384, -70.6530774] },
  { id: 209, nombre: "Santa Ana", lineas: ["L2", "L5"], coords: [-33.4382499, -70.6598961] },
  { id: 210, nombre: "Toesca", lineas: ["L2"], coords: [-33.4529746, -70.6585851] },
  { id: 211, nombre: "Parque O'Higgins", lineas: ["L2"], coords: [-33.4608472, -70.6568466] },
  { id: 212, nombre: "Rondizzoni", lineas: ["L2"], coords: [-33.4696578, -70.6563736] },
  { id: 213, nombre: "Franklin", lineas: ["L2", "L6"], coords: [-33.4766603, -70.6494774] },
  { id: 214, nombre: "El Llano", lineas: ["L2"], coords: [-33.4826014, -70.6493814] },
  { id: 215, nombre: "San Miguel", lineas: ["L2"], coords: [-33.4887157, -70.6510725] },
  { id: 216, nombre: "Lo Vial", lineas: ["L2"], coords: [-33.4968286, -70.6530148] },
  { id: 217, nombre: "Departamental", lineas: ["L2"], coords: [-33.5024398, -70.6546333] },
  { id: 218, nombre: "Ciudad del Niño", lineas: ["L2"], coords: [-33.5095432, -70.6566453] },
  { id: 219, nombre: "Lo Ovalle", lineas: ["L2"], coords: [-33.5172701, -70.6588205] },
  { id: 220, nombre: "El Parrón", lineas: ["L2"], coords: [-33.5264317, -70.6614044] },
  { id: 221, nombre: "La Cisterna", lineas: ["L2", "L4A"], coords: [-33.5373498, -70.6643328] },
  // Extensión inaugurada Línea 2 al Sur
  { id: 222, nombre: "El Bosque", lineas: ["L2"], coords: [-33.5465722, -70.6667515] },
  { id: 223, nombre: "Observatorio", lineas: ["L2"], coords: [-33.5604040, -70.6705486] },
  { id: 224, nombre: "Copa Lo Martínez", lineas: ["L2"], coords: [-33.5706669, -70.6733824] },
  { id: 225, nombre: "Hospital El Pino", lineas: ["L2"], coords: [-33.5828788, -70.6768121] },

  // ==========================================
  // LÍNEA 3 (Norponiente a Oriente - Coordenadas OSM Reales)
  // ==========================================
  { id: 301, nombre: "Plaza Quilicura", lineas: ["L3"], coords: [-33.3657194, -70.7288942] },
  { id: 302, nombre: "Lo Cruzat", lineas: ["L3"], coords: [-33.3668342, -70.7197720] },
  { id: 303, nombre: "Ferrocarril", lineas: ["L3"], coords: [-33.3654667, -70.7055375] },
  { id: 304, nombre: "Los Libertadores", lineas: ["L3"], coords: [-33.3654303, -70.6919903] },
  { id: 305, nombre: "Cardenal Caro", lineas: ["L3"], coords: [-33.3732586, -70.6863362] },
  { id: 306, nombre: "Vivaceta", lineas: ["L3"], coords: [-33.3853813, -70.6796401] },
  { id: 307, nombre: "Conchalí", lineas: ["L3"], coords: [-33.3978904, -70.6695999] },
  { id: 308, nombre: "Plaza Chacabuco", lineas: ["L3"], coords: [-33.4067715, -70.6609686] },
  { id: 309, nombre: "Hospitales", lineas: ["L3"], coords: [-33.4176739, -70.6564558] },
  { id: 310, nombre: "Parque Almagro", lineas: ["L3"], coords: [-33.4513929, -70.6505616] },
  { id: 311, nombre: "Matta", lineas: ["L3"], coords: [-33.4582698, -70.6430769] },
  { id: 312, nombre: "Monseñor Eyzaguirre", lineas: ["L3"], coords: [-33.4531944, -70.6135190] },
  { id: 313, nombre: "Ñuñoa", lineas: ["L3", "L6"], coords: [-33.4541894, -70.6049720] },
  { id: 314, nombre: "Chile España", lineas: ["L3"], coords: [-33.4549078, -70.5981422] },
  { id: 315, nombre: "Villa Frei", lineas: ["L3"], coords: [-33.4546697, -70.5814833] },
  { id: 316, nombre: "Fernando Castillo Velasco", lineas: ["L3"], coords: [-33.4521007, -70.5581070] },

  // ==========================================
  // LÍNEA 4 (Oriente a Puente Alto - Coordenadas OSM Reales)
  // ==========================================
  { id: 401, nombre: "Cristóbal Colón", lineas: ["L4"], coords: [-33.4263163, -70.5909808] },
  { id: 402, nombre: "Francisco Bilbao", lineas: ["L4"], coords: [-33.4317928, -70.5847030] },
  { id: 403, nombre: "Príncipe de Gales", lineas: ["L4"], coords: [-33.4392047, -70.5731497] },
  { id: 404, nombre: "Simón Bolívar", lineas: ["L4"], coords: [-33.4461845, -70.5719261] },
  { id: 405, nombre: "Plaza Egaña", lineas: ["L4", "L3"], coords: [-33.4534937, -70.5708230] },
  { id: 406, nombre: "Los Orientales", lineas: ["L4"], coords: [-33.4626181, -70.5739242] },
  { id: 407, nombre: "Grecia", lineas: ["L4"], coords: [-33.4695344, -70.5765034] },
  { id: 408, nombre: "Los Presidentes", lineas: ["L4"], coords: [-33.4798370, -70.5786662] },
  { id: 409, nombre: "Quilín", lineas: ["L4"], coords: [-33.4882637, -70.5804178] },
  { id: 410, nombre: "Las Torres", lineas: ["L4"], coords: [-33.4991080, -70.5865459] },
  { id: 411, nombre: "Macul", lineas: ["L4"], coords: [-33.5092379, -70.5900473] }, // Américo Vespucio con Departamental
  { id: 412, nombre: "Vicuña Mackenna", lineas: ["L4", "L4A"], coords: [-33.5197638, -70.5962095] },
  { id: 413, nombre: "Rojas Magallanes", lineas: ["L4"], coords: [-33.5361069, -70.5926966] },
  { id: 414, nombre: "Trinidad", lineas: ["L4"], coords: [-33.5462943, -70.5881027] },
  { id: 415, nombre: "San José de la Estrella", lineas: ["L4"], coords: [-33.5538213, -70.5865567] },
  { id: 416, nombre: "Los Quillayes", lineas: ["L4"], coords: [-33.5612253, -70.5852697] },
  { id: 417, nombre: "Elisa Correa", lineas: ["L4"], coords: [-33.5692937, -70.5838076] },
  { id: 418, nombre: "Hospital Sótero del Río", lineas: ["L4"], coords: [-33.5768981, -70.5823170] },
  { id: 419, nombre: "Protectora de la Infancia", lineas: ["L4"], coords: [-33.5895738, -70.5798330] },
  { id: 420, nombre: "Las Mercedes", lineas: ["L4"], coords: [-33.6013816, -70.5774783] },
  { id: 421, nombre: "Plaza de Puente Alto", lineas: ["L4"], coords: [-33.6095235, -70.5758419] },

  // ==========================================
  // LÍNEA 4A (Eje Vespucio Sur - Coordenadas OSM Reales)
  // ==========================================
  { id: 451, nombre: "San Ramón", lineas: ["L4A"], coords: [-33.5412286, -70.6431272] },
  { id: 452, nombre: "Santa Rosa", lineas: ["L4A"], coords: [-33.5423878, -70.6341267] },
  { id: 453, nombre: "La Granja", lineas: ["L4A"], coords: [-33.5411298, -70.6160470] },
  { id: 454, nombre: "Santa Julia", lineas: ["L4A"], coords: [-33.5311022, -70.6055361] },

  // ==========================================
  // LÍNEA 5 (Poniente a Suroriente - Coordenadas OSM Reales)
  // ==========================================
  { id: 501, nombre: "Plaza de Maipú", lineas: ["L5"], coords: [-33.5101997, -70.7570009] },
  { id: 502, nombre: "Santiago Bueras", lineas: ["L5"], coords: [-33.4962414, -70.7574349] },
  { id: 503, nombre: "Del Sol", lineas: ["L5"], coords: [-33.4902363, -70.7531153] },
  { id: 504, nombre: "Monte Tabor", lineas: ["L5"], coords: [-33.4822861, -70.7454383] },
  { id: 505, nombre: "Las Parcelas", lineas: ["L5"], coords: [-33.4752719, -70.7399789] },
  { id: 506, nombre: "Laguna Sur", lineas: ["L5"], coords: [-33.4621633, -70.7379067] },
  { id: 507, nombre: "Barrancas", lineas: ["L5"], coords: [-33.4529813, -70.7390370] },
  { id: 508, nombre: "Pudahuel", lineas: ["L5"], coords: [-33.4448632, -70.7411438] },
  { id: 509, nombre: "Lo Prado", lineas: ["L5"], coords: [-33.4434094, -70.7167535] },
  { id: 510, nombre: "Blanqueado", lineas: ["L5"], coords: [-33.4413309, -70.7066515] },
  { id: 511, nombre: "Gruta de Lourdes", lineas: ["L5"], coords: [-33.4380110, -70.6910279] },
  { id: 512, nombre: "Quinta Normal", lineas: ["L5"], coords: [-33.4403680, -70.6802912] },
  { id: 513, nombre: "Cumming", lineas: ["L5"], coords: [-33.4391444, -70.6685340] },
  { id: 514, nombre: "Plaza de Armas", lineas: ["L5", "L3"], coords: [-33.4374154, -70.6512777] },
  { id: 515, nombre: "Bellas Artes", lineas: ["L5"], coords: [-33.4366322, -70.6441329] },
  { id: 516, nombre: "Parque Bustamante", lineas: ["L5"], coords: [-33.4428037, -70.6319594] },
  { id: 517, nombre: "Santa Isabel", lineas: ["L5"], coords: [-33.4471204, -70.6304343] },
  { id: 518, nombre: "Irarrázaval", lineas: ["L5", "L3"], coords: [-33.4550535, -70.6283154] },
  { id: 519, nombre: "Ñuble", lineas: ["L5", "L6"], coords: [-33.4673629, -70.6247567] },
  { id: 520, nombre: "Rodrigo de Araya", lineas: ["L5"], coords: [-33.4778167, -70.6222636] },
  { id: 521, nombre: "Carlos Valdovinos", lineas: ["L5"], coords: [-33.4863985, -70.6191824] },
  { id: 522, nombre: "Camino Agrícola", lineas: ["L5"], coords: [-33.4917907, -70.6175195] },
  { id: 523, nombre: "San Joaquín", lineas: ["L5"], coords: [-33.4993359, -70.6158257] },
  { id: 524, nombre: "Pedrero", lineas: ["L5"], coords: [-33.5079499, -70.6124467] },
  { id: 525, nombre: "Mirador", lineas: ["L5"], coords: [-33.5133028, -70.6059146] },
  { id: 526, nombre: "Bellavista de La Florida", lineas: ["L5"], coords: [-33.5195217, -70.6000253] },
  { id: 527, nombre: "Vicente Valdés", lineas: ["L5", "L4"], coords: [-33.5264186, -70.5967924] },

  // ==========================================
  // LÍNEA 6 (Poniente a Oriente - Coordenadas OSM Reales)
  // ==========================================
  { id: 601, nombre: "Cerrillos", lineas: ["L6"], coords: [-33.4834342, -70.6955562] },
  { id: 602, nombre: "Lo Valledor", lineas: ["L6"], coords: [-33.4784048, -70.6809001] },
  { id: 603, nombre: "Presidente Pedro Aguirre Cerda", lineas: ["L6"], coords: [-33.4786906, -70.6647874] },
  { id: 604, nombre: "Bío Bío", lineas: ["L6"], coords: [-33.4766072, -70.6421784] },
  { id: 605, nombre: "Estadio Nacional", lineas: ["L6"], coords: [-33.4623809, -70.6062176] },
  { id: 606, nombre: "Inés de Suárez", lineas: ["L6"], coords: [-33.4387210, -70.6073371] }
];

// Helper: Trazados ordenados para Leaflet
export const TRAZADO_L1 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);

export const TRAZADO_L2 = [
  201, 202, 203, 204, 205, 206, 207, 208, 209, 11, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);

export const TRAZADO_L3 = [
  301, 302, 303, 304, 305, 306, 307, 308, 309, 208, 514, 13, 310, 311, 518, 312, 313, 314, 315, 405, 316
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);

export const TRAZADO_L4 = [
  21, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 527, 413, 414, 415, 416, 417, 418, 419, 420, 421
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);

export const TRAZADO_L4A = [
  221, 451, 452, 453, 454, 412
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);

export const TRAZADO_L5 = [
  501, 502, 503, 504, 505, 506, 507, 508, 1, 509, 510, 511, 512, 513, 209, 514, 515, 16, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);

export const TRAZADO_L6 = [
  601, 602, 603, 213, 604, 519, 605, 313, 606, 20
].map(id => TODAS_LAS_ESTACIONES.find(e => e.id === id).coords);