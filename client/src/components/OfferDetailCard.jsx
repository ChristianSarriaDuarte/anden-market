import React from 'react';
import { TODAS_LAS_ESTACIONES, LINEAS_METRO } from '../data/metroConfig';

function getEstiloTiempo(horas) {
  if (horas > 48) return { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' };
  if (horas >= 24) return { bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' };
  return { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' };
}

export default function OfferDetailCard({ oferta, onClose }) {
  if (!oferta) return null;

  const estiloTiempo = getEstiloTiempo(oferta.horasRestantes || 72);

  // Obtener todas las estaciones asociadas a esta publicación
  const idsEstaciones = Array.isArray(oferta.estaciones) && oferta.estaciones.length > 0
    ? oferta.estaciones.map(Number)
    : [Number(oferta.id_estacion)];

  const estacionesInfo = idsEstaciones
    .map(id => TODAS_LAS_ESTACIONES.find(e => Number(e.id) === id))
    .filter(Boolean);

  const getColorLinea = (cod) => {
    const l = LINEAS_METRO.find(item => item.id === cod);
    return l ? l.color : '#E31B23';
  };

  // Formatear enlace directo a WhatsApp
  const mensajeWsp = encodeURIComponent(
    `¡Hola! Te contacto desde Andén Market por tu publicación "${oferta.titulo}" ($${Number(oferta.precio).toLocaleString('es-CL')}). ¿Aún está disponible para coordinar en el metro?`
  );
  const linkWhatsApp = `https://wa.me/${oferta.telefono}?text=${mensajeWsp}`;

  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      bottom: '20px',
      width: '360px',
      background: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* Botón cerrar flotante */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0,0,0,0.6)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        ✕
      </button>

      {/* Imagen */}
      <div style={{ width: '100%', height: '190px', background: '#F3F4F6', position: 'relative' }}>
        <img
          src={oferta.imagen || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}
          alt={oferta.titulo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          background: estiloTiempo.bg,
          color: estiloTiempo.color,
          border: `1px solid ${estiloTiempo.border}`,
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}>
          ⏳ Expira en {oferta.horasRestantes || 72}h
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div style={{ padding: '18px', overflowY: 'auto', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#111827', lineHeight: 1.3 }}>
            {oferta.titulo}
          </h3>
        </div>

        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#059669', marginBottom: '14px' }}>
          ${Number(oferta.precio).toLocaleString('es-CL')}
        </div>

        {/* Alias del vendedor */}
        {oferta.vendedor && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px', fontSize: '0.85rem', color: '#4B5563' }}>
            <span>👤 Vendedor:</span>
            <strong style={{ color: '#111827' }}>{oferta.vendedor}</strong>
          </div>
        )}

        {/* Estaciones disponibles para coordinar entrega */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
            Estaciones de entrega disponibles:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {estacionesInfo.map(est => (
              <span
                key={est.id}
                style={{
                  background: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <div style={{ display: 'flex', gap: '2px' }}>
                  {est.lineas.map(lin => (
                    <span
                      key={lin}
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: getColorLinea(lin)
                      }}
                    />
                  ))}
                </div>
                <strong>{est.nombre}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
            Detalles:
          </span>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151', lineHeight: '1.5' }}>
            {oferta.descripcion || 'Sin descripción adicional.'}
          </p>
        </div>
      </div>

      {/* Botón WhatsApp */}
      <div style={{ padding: '16px', borderTop: '1px solid #E5E7EB', background: '#FAFAFA' }}>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            background: '#25D366',
            color: '#FFFFFF',
            textDecoration: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            boxSizing: 'border-box'
          }}
        >
          <span>💬</span> Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}