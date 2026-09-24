import React from 'react';

function getEstiloTiempo(horas) {
  if (horas > 48) return { bg: '#DCFCE7', color: '#166534' };
  if (horas >= 24) return { bg: '#FEF9C3', color: '#854D0E' };
  return { bg: '#FEE2E2', color: '#991B1B' };
}

export default function OfferCard({ oferta, onVerDetalle, estaSeleccionada }) {
  const { titulo, precio, tipo, horasRestantes = 72 } = oferta;
  const estiloTiempo = getEstiloTiempo(horasRestantes);

  return (
    <div style={{
      border: estaSeleccionada ? '2px solid #E31B23' : '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '10px',
      background: estaSeleccionada ? '#FEF2F2' : '#FFFFFF',
      transition: 'all 0.15s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{
          fontSize: '0.7rem',
          background: '#F3F4F6',
          color: '#374151',
          padding: '2px 8px',
          borderRadius: '4px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {tipo}
        </span>
        <span style={{
          fontSize: '0.7rem',
          background: estiloTiempo.bg,
          color: estiloTiempo.color,
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          ⏳ {horasRestantes}h restantes
        </span>
      </div>

      <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: '#111827' }}>
        {titulo}
      </h4>

      <p style={{ margin: '0 0 10px 0', color: '#059669', fontWeight: 'bold', fontSize: '1.05rem' }}>
        ${precio.toLocaleString('es-CL')}
      </p>

      <button
        onClick={() => onVerDetalle(oferta)}
        style={{
          width: '100%',
          padding: '7px 0',
          background: '#1F2937',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Ver detalle
      </button>
    </div>
  );
}