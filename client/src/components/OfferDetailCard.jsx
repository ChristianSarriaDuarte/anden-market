import React from 'react';
import { ESTACIONES_L1 } from '../data/metroConfig';

function getEstiloTiempo(horas) {
  if (horas > 48) return { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' };
  if (horas >= 24) return { bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' };
  return { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' };
}

export default function OfferDetailCard({ oferta, estacion, onClose }) {
  if (!oferta) return null;

  const { titulo, precio, tipo, descripcion, telefono, horasRestantes = 72, imagen, id_estacion } = oferta;
  const fotoUrl = imagen || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80";
  const estiloTiempo = getEstiloTiempo(horasRestantes);

  // Si no viene por prop, la busca directamente por id en metroConfig
  const estacionEncontrada = estacion || ESTACIONES_L1.find(e => e.id === id_estacion);
  const nombreEstacion = estacionEncontrada?.nombre || "Línea 1";

  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '360px',
      background: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.25)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #E5E7EB',
      overflow: 'hidden'
    }}>
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.65)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          zIndex: 20
        }}
      >
        ✕
      </button>

      {/* Foto */}
      <div style={{ width: '100%', height: '200px', background: '#F3F4F6', flexShrink: 0 }}>
        <img src={fotoUrl} alt={titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Contenido */}
      <div style={{ padding: '18px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Chips superiores */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', background: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
              Metro {nombreEstacion}
            </span>
            <span style={{ fontSize: '0.75rem', background: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
              {tipo}
            </span>
          </div>

          <span style={{
            fontSize: '0.75rem',
            background: estiloTiempo.bg,
            color: estiloTiempo.color,
            border: `1px solid ${estiloTiempo.border}`,
            padding: '3px 8px',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}>
            ⏳ {horasRestantes}h
          </span>
        </div>

        <h3 style={{ margin: '6px 0', fontSize: '1.2rem', color: '#111827' }}>
          {titulo}
        </h3>

        <p style={{ margin: '0 0 12px 0', color: '#059669', fontWeight: 'bold', fontSize: '1.35rem' }}>
          ${precio.toLocaleString('es-CL')}
        </p>

        <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.5', flex: 1 }}>
          {descripcion}
        </p>

        <a
          href={`https://wa.me/${telefono}?text=Hola,%20te%20escribo%20por:%20${encodeURIComponent(titulo)}%20en%20Metro%20${encodeURIComponent(nombreEstacion)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            background: '#25D366',
            color: '#FFFFFF',
            padding: '12px 0',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 'bold'
          }}
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}