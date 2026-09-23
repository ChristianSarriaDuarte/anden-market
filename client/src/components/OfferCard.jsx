import React from 'react';

export default function OfferCard({ oferta }) {
  const { titulo, precio, tipo, descripcion, telefono } = oferta;

  const esServicio = tipo === 'Servicio';

  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '14px',
      marginBottom: '12px',
      background: '#FAFAFA'
    }}>
      <span style={{
        fontSize: '0.7rem',
        background: esServicio ? '#E0E7FF' : '#DCFCE7',
        color: esServicio ? '#3730A3' : '#166534',
        padding: '3px 8px',
        borderRadius: '4px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        {tipo}
      </span>

      <h4 style={{ margin: '8px 0 4px 0', fontSize: '1rem', color: '#111827' }}>
        {titulo}
      </h4>

      <p style={{ margin: '0 0 8px 0', color: '#059669', fontWeight: 'bold', fontSize: '1.1rem' }}>
        ${precio.toLocaleString('es-CL')}
      </p>

      <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.4' }}>
        {descripcion}
      </p>

      <a
        href={`https://wa.me/${telefono}?text=Hola,%20te%20escribo%20desde%20Anden%20Market%20por:%20${encodeURIComponent(titulo)}`}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-block',
          background: '#25D366',
          color: '#FFFFFF',
          padding: '8px 14px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}
      >
        Contactar por WhatsApp
      </a>
    </div>
  );
}