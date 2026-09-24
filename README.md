# Anden Market

Plataforma web de comercio colaborativo y local estructurada sobre la red geografica de Metro de Santiago. El sistema transforma las estaciones del tren subterraneo en puntos de encuentro georreferenciados para transacciones seguras entre usuarios

---

## Tabla de Contenidos
1. Descripcion General
2. Arquitectura del Sistema
3. Manejo de Frontend
4. Manejo de Backend
5. Manejo de APIs y Servicios
6. Estructura del Proyecto
7. Metodologia de Trabajo
8. Historias de Usuario (Backlog)
9. Pila Tecnologica
10. Instalacion y Ejecucion

---

## 1. Descripcion General

A diferencia de los marketplaces tradicionales basados en limites comunales o coordenadas arbitrarias, Anden Market indexa la oferta comercial directamente sobre la infraestructura del transporte publico:
* Cartografia Oficial: Mapeo vectorial de las 7 lineas operativas (L1, L2, L3, L4, L4A, L5 y L6), incluyendo extensiones recientes como L2 hacia San Bernardo y L3 hacia Quilicura.
* Nodos de Combinacion Normalizados: Representacion singular de estaciones de transbordo para evitar duplicidad de marcadores y colisiones topologicas.
* Experiencia Adaptativa: Navegacion por mapa con panel lateral en escritorio y transicion a Bottom Sheet tactil en dispositivos moviles.

---

## 2. Arquitectura del Sistema

El proyecto sigue una arquitectura desacoplada Cliente-Servidor orientada a Single Page Application (SPA):
El problema visual está ocurriendo por dos detalles de formato Markdown:

En la sección 2 (Arquitectura): El diagrama ASCII no tiene los tres acentos graves (```) de apertura y cierre, por lo que Markdown lo interpreta como texto normal, colapsa los espacios y rompe las cajas.

En la sección 6 (Estructura): Se escribió la palabra bash suelta arriba y se cerró con comillas simples (''') al final en vez de tres acentos graves de código (```).

Aquí tienes únicamente los bloques de la sección 2 y la sección 6 formateados correctamente para reemplazar y que se rendericen alineados:

Reemplazo para la Sección 2 (Arquitectura del Sistema)
Markdown
## 2. Arquitectura del Sistema

El proyecto sigue una arquitectura desacoplada Cliente-Servidor orientada a Single Page Application (SPA):

```text
┌─────────────────────────────────────────────────────────────┐
│                    Cliente (React + Vite)                   │
│  ┌────────────────┐   ┌───────────────────┐   ┌──────────┐  │
│  │  MapView.jsx   │   │ Layout Responsive │   │ UI Shell │  │
│  │ (Motor Leaflet)│   │ Sidebar / Bottom  │   │ (Navbar) │  │
│  └───────┬────────┘   └─────────┬─────────┘   └────┬─────┘  │
│          │                      │                  │        │
│          └──────────────────────┴──────────────────┘        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             Capa de Datos Local (metroConfig.js)            │
│  • Catálogo normalizado de estaciones (ID, líneas, coords)  │
│  • Polilíneas vectoriales georreferenciadas                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   API REST Transaccional                    │
│  • Endpoints de publicaciones, usuarios y nodos de entrega  │
└─────────────────────────────────────────────────────────────┘
```

## 3. Manejo de Frontend

La aplicacion cliente esta desarrollada como una SPA con React y Vite, priorizando el rendimiento del mapa y la reactividad de la interfaz:

* Integracion Cartografica con Leaflet:
  * El mapa se encapsula en el componente `MapView.jsx` utilizando referencias mutables (`useRef`) para el contenedor DOM y la instancia de Leaflet.
  * Esto previene renderizados dobles y destrucciones accidentales de canvas ante actualizaciones de estado en React.
  * Los trazados de las lineas se dibujan mediante `L.polyline` consumiendo arreglos ordenados de coordenadas (`TRAZADO_LX`) vinculados a los identificadores del dataset central.
* Optimizacion Visual de Teselas:
  * Se aplica una clase CSS dedicada (`.mapa-base-suave`) a la capa de teselas de OpenStreetMap (`L.tileLayer`) con filtros de desaturacion y contraste.
  * Esto atenua los elementos urbanos secundarios y asegura contraste maximo para las lineas y estaciones del metro.
* Gestion de Estado y Comunicacion de Componentes:
  * El estado de la estacion seleccionada (`selectedStation`) se eleva al componente de vista principal (`Home.jsx`).
  * Al hacer clic sobre cualquier marcador en Leaflet, se dispara el callback `onSelectEstacion(estacion)`, actualizando de forma sincronizada el panel de publicaciones sin refrescar la vista.
* Enfoque Responsive Hibrido:
  * Desktop (>= 768px): Distribucion en dos columnas con mapa en viewport principal y sidebar derecho con ancho fijo[cite: 3].
  * Mobile (< 768px): El mapa ocupa el 100% de la pantalla y el panel derecho se transforma en un Bottom Sheet modal deslizable desde el borde inferior[cite: 1, 3].

---

## 4. Manejo de Backend

La capa de backend proporciona la logica de negocio y persistencia transaccional de la plataforma:

* Patron Arquitectonico:
  * API RESTful modular construida con Node.js y Express (o framework compatible), organizada en controladores, servicios, modelos y rutas.
  * Desacoplamiento total entre las operaciones de lectura cartografica (optimizadas en frontend) y las transacciones de base de datos.
* Modelo de Datos Relacional:
  * Usuarios: Almacena credenciales, datos de perfil, reputacion de entregas y lista de estaciones habituales.
  * Publicaciones / Productos: Contiene titulo, descripcion, precio, estado (disponible/vendido), imagenes y marca temporal.
  * Estaciones (Catalogo Referencial): Replica estructurada de los identificadores unicos del metro (`station_id`) para integridad referencial.
  * Tabla Intermedia (Publicacion_Estacion): Relacion N:N que permite a un vendedor asociar una publicacion a multiples estaciones validas para entrega.
* Logica de Endpoints Principales:
  * `GET /api/estaciones`: Retorna el catalogo de estaciones con agregacion del total de productos activos en cada una.
  * `GET /api/estaciones/:id/productos`: Consulta paginada de productos disponibles para entrega en el nodo seleccionado[cite: 1, 3].
  * `POST /api/productos`: Valida que los `station_ids` provistos existan en el catalogo antes de crear la publicacion.
  * `POST /api/auth/login` y `POST /api/auth/register`: Autenticacion basada en tokens JWT para proteccion de rutas de creacion y edicion.
* Seguridad y Politicas de Red:
  * Middleware CORS configurado especificamente para el origen del frontend local y produccion.
  * Sanitizacion de entradas y validacion de esquemas en payloads de creacion de productos.

---

## 5. Manejo de APIs y Servicios

| Servicio / Endpoint | Tipo | Proposito | Estrategia de Implementacion |
| :--- | :--- | :--- | :--- |
| OpenStreetMap / Overpass Turbo | Externa | Extraccion topologica y georreferenciacion milimetrica de andenes. | Consultas Overpass QL estructuradas y descarga GeoJSON para poblar `metroConfig.js` de forma estatica[cite: 2, 3]. |
| Leaflet / OSM Tile Layer | Libreria / Capa | Renderizado de teselas base y polilineas vectoriales[cite: 1, 3]. | Montaje en canvas con `useRef`, capas por color corporativo y filtros CSS de contraste[cite: 3]. |
| REST API Interna | Interna | Gestion transaccional de publicaciones, usuarios y nodos de entrega. | Endpoints RESTful estructurados con respuestas JSON y codigos de estado HTTP estandarizados. |

---

## 6. Estructura del Proyecto

bash
anden-market/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── MapView.jsx          # Motor cartografico Leaflet
│       │   ├── Navbar.jsx           # Barra de navegacion principal
│       │   └── BottomSheet.jsx      # Panel deslizante para mobile
│       ├── data/
│       │   └── metroConfig.js       # Coordenadas, trazados y nodos normalizados
│       ├── views/
│       │   └── Home.jsx             # Vista principal (mapa + panel contextual)
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── src/
│   │   ├── config/                  # Variables de entorno y conexion a BD
│   │   ├── controllers/             # Controladores de productos y usuarios
│   │   ├── models/                  # Esquemas de base de datos
│   │   ├── routes/                  # Definicion de endpoints REST
│   │   └── index.js                 # Punto de entrada del servidor
│   └── package.json
├── package.json
└── README.md
'''

## 7. Metodologia de Trabajo
Se implementa un marco de trabajo agil iterativo (Scrum adaptado / Kanban) con entregas orientadas a hitos funcionales verificables:

Fase 1 (Topologia y Datos): Extraccion, depuracion de coordenadas mediante Overpass y ensamblado del dataset oficial de la red[cite: 2, 3].

Fase 2 (Visualizacion Cartografica): Renderizado de polilineas continuas, marcadores de transbordo y ajuste visual en Leaflet[cite: 1, 3].

Fase 3 (UI/UX Responsive): Optimizacion para pantallas tactiles mediante implementacion de Bottom Sheet interactivo[cite: 1, 3].

Fase 4 (Integracion Backend): Creacion del modelo relacional de publicaciones y endpoints de consulta por nodo.

Estandar de control de versiones: Commits atomicos basados en la convencion Conventional Commits (feat(map): ..., fix(coords): ...).

## 8. Historias de Usuario (Backlog)
HU-01: Exploracion por Estacion

Como usuario comprador que viaja en metro,

quiero presionar una estacion dentro del mapa interactivo,

para ver los productos disponibles para entrega en ese punto[cite: 1, 3].

Criterio de Aceptacion: Al hacer clic en un marcador, el panel muestra nombre, lineas que cruzan y el listado de ofertas activas[cite: 1, 3].

HU-02: Publicacion Asociada a Nodos

Como vendedor de la plataforma,

quiero vincular mis estaciones frecuentes de transito al publicar un item,

para concertar entregas sin alterar mi ruta habitual.

Criterio de Aceptacion: El formulario de creacion exige seleccionar al menos una estacion valida del listado oficial[cite: 3].

HU-03: Navegacion Movil en Transito

Como usuario navegando desde mi celular dentro de la red,

quiero que la informacion se despliegue en un Bottom Sheet deslizable,

para explorar ofertas sin perder visibilidad del trazado general del mapa[cite: 1, 3].

Criterio de Aceptacion: En anchos menores a 768px, el sidebar lateral se oculta y la informacion emerge desde la base de la pantalla[cite: 1, 3].

HU-04: Reconocimiento de Estaciones de Transbordo

Como usuario frecuente del metro,

quiero identificar de un vistazo las estaciones de combinacion,

para coordinar transacciones en puntos de intercambio intermodal[cite: 3].

Criterio de Aceptacion: Las estaciones combinadas se renderizan con mayor radio, borde reforzado y tooltip multilinea[cite: 3].

## 9. Pila Tecnologica
Frontend: React, Vite, CSS Modules / Tailwind CSS.

Motor Cartografico: Leaflet.js, OpenStreetMap Tiles, Overpass API[cite: 1, 3].

Backend: Node.js, Express.

Base de Datos: PostgreSQL / SQLite (soporte relacional para modelo de estaciones).

Control de Versiones: Git, GitHub.

## 10. Instalacion y Ejecucion
Clonar el repositorio:

Bash
git clone [https://github.com/tu-usuario/anden-market.git](https://github.com/tu-usuario/anden-market.git)
cd anden-market
Configurar el cliente:

Bash
cd client
npm install
npm run dev
Configurar el servidor (al integrar backend):

Bash
cd ../server
npm install
npm run dev
