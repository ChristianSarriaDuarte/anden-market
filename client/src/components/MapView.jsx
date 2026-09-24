import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { SANTIAGO_BOUNDS, ESTACIONES_L1 } from '../data/metroConfig';

export default function MapView({ onSelectEstacion }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  
  // Guardamos el callback en un ref para que nunca fuerce la reinicialización del mapa
  const onSelectRef = useRef(onSelectEstacion);
  useEffect(() => {
    onSelectRef.current = onSelectEstacion;
  }, [onSelectEstacion]);

  useEffect(() => {
    // Si ya existe la instancia o no está el contenedor, no hacer nada
    if (mapInstanceRef.current || !mapContainerRef.current) return;

    const santiagoBounds = L.latLngBounds(SANTIAGO_BOUNDS[0], SANTIAGO_BOUNDS[1]);

    const map = L.map(mapContainerRef.current, {
      minZoom: 11,
      maxZoom: 17,
      maxBounds: santiagoBounds,
      maxBoundsViscosity: 1.0,
    }).setView([-33.4372, -70.6346], 13);

    mapInstanceRef.current = map;

    // Capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    // Trazado de Línea 1
    const puntosRuta = ESTACIONES_L1.map(est => est.coords);
    L.polyline(puntosRuta, {
      color: '#E31B23',
      weight: 6,
      opacity: 0.85,
    }).addTo(map);

    // Nodos de estaciones
    ESTACIONES_L1.forEach(estacion => {
      const marker = L.circleMarker(estacion.coords, {
        radius: 8,
        color: '#FFFFFF',
        fillColor: '#E31B23',
        fillOpacity: 1,
        weight: 2,
      }).addTo(map);

      marker.bindTooltip(estacion.nombre, {
        direction: 'top',
        offset: [0, -6],
      });

      // Dispara la función usando el ref estable
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
  }, []); // Array vacío: se monta una sola vez y no parpadea nunca más

  return (
    <div 
      ref={mapContainerRef} 
      style={{ flex: 1, height: '100%', width: '100%' }} 
    />
  );
}