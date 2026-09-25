import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  TODAS_LAS_ESTACIONES, 
  TRAZADO_L1, 
  TRAZADO_L2, 
  TRAZADO_L3,
  TRAZADO_L4, 
  TRAZADO_L4A, 
  TRAZADO_L5, 
  TRAZADO_L6,
  SANTIAGO_BOUNDS, 
  LINEAS_METRO 
} from '../data/metroConfig';

export default function MapView({ onSelectEstacion }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const onSelectRef = useRef(onSelectEstacion);
  useEffect(() => {
    onSelectRef.current = onSelectEstacion;
  }, [onSelectEstacion]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // 1. Inicializar Mapa
    const map = L.map(mapContainerRef.current, {
      center: [-33.4500, -70.6400],
      zoom: 12,
      maxBounds: SANTIAGO_BOUNDS,
      minZoom: 12,
      maxZoom: 16
    });

    mapInstanceRef.current = map;

    // 2. Capa base OpenStreetMap suavizada
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: 'mapa-base-suave'
    }).addTo(map);

    // 3. Trazado Línea 1 (Rojo)
    L.polyline(TRAZADO_L1, {
      color: '#E31B23',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 4. Trazado Línea 2 (Amarillo Metro)
    L.polyline(TRAZADO_L2, {
      color: '#F5A623',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 5. Trazado Línea 3 (Café Metro)
    L.polyline(TRAZADO_L3, {
      color: '#7D5836',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 6. Trazado Línea 4 (Azul Metro)
    L.polyline(TRAZADO_L4, {
      color: '#0055A5',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 7. Trazado Línea 4A (Celeste Metro)
    L.polyline(TRAZADO_L4A, {
      color: '#00AEEF',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 8. Trazado Línea 5 (Verde Metro)
    L.polyline(TRAZADO_L5, {
      color: '#009640',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 9. Trazado Línea 6 (Morado Metro)
    L.polyline(TRAZADO_L6, {
      color: '#6A2A82',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    const getColorLinea = (cod) => {
      const l = LINEAS_METRO.find(item => item.id === cod);
      return l ? l.color : '#E31B23';
    };

    // 10. Marcadores de estaciones
    const estacionesConCoords = TODAS_LAS_ESTACIONES.filter(e => e.coords);

    estacionesConCoords.forEach(estacion => {
      const esCombinacion = estacion.lineas.length > 1;
      const colorPrimario = getColorLinea(estacion.lineas[0]);

      const marker = L.circleMarker(estacion.coords, {
        radius: esCombinacion ? 7 : 5,
        color: esCombinacion ? '#111827' : colorPrimario,
        fillColor: '#FFFFFF',
        fillOpacity: 1,
        weight: esCombinacion ? 3 : 2.5
      }).addTo(map);

      const textoCombinacion = esCombinacion ? ` (${estacion.lineas.join('/')})` : '';
      marker.bindTooltip(
        `<div style="font-family:sans-serif;font-weight:bold;font-size:12px;">${estacion.nombre}${textoCombinacion}</div>`,
        { direction: 'top', offset: [0, -6], opacity: 0.95 }
      );

      marker.on('click', () => {
        if (onSelectRef.current) {
          onSelectRef.current(estacion);
        }
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .mapa-base-suave {
          filter: saturate(0.75) contrast(0.92) brightness(1.02);
        }
      `}</style>
      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '100%', background: '#F8FAFC' }} 
      />
    </>
  );
}