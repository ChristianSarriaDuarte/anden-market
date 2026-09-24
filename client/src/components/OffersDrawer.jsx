import React, { useState } from 'react';
import OfferCard from './OfferCard';

export default function OffersDrawer({ estacion, publicaciones, ofertaDetalle, onVerDetalle }) {
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  if (!estacion) {
    return (
      <div style={{
        width: '360px',
        background: '#FFFFFF',
        borderLeft: '1px solid #E5E7EB',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚉</span>
        <h3 style={{ margin: '0 0 8px 0', color: '#1F2937' }}>Andén Market</h3>
        <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: '1.5' }}>
          Haz clic en una estación del mapa para revisar las ofertas disponibles en ese punto.
        </p>
      </div>
    );
  }

  const ofertasEstacion = publicaciones.filter(p => p.id_estacion === estacion.id);
  const ofertasFiltradas = filtroTipo === 'Todos'
    ? ofertasEstacion
    : ofertasEstacion.filter(p => p.tipo === filtroTipo);

  return (
    <div style={{
      width: '360px',
      background: '#FFFFFF',
      borderLeft: '1px solid #E5E7EB',
      padding: '20px',
      overflowY: 'auto'
    }}>
      {/* Cabecera */}
      <div style={{ background: '#FEE2E2', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
        <span style={{ color: '#991B1B', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
          LÍNEA 1
        </span>
        <h3 style={{ margin: '4px 0 0 0', color: '#1F2937', fontSize: '1.25rem' }}>
          {estacion.nombre}
        </h3>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['Todos', 'Producto', 'Servicio'].map(tipo => (
          <button
            key={tipo}
            onClick={() => setFiltroTipo(tipo)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid #D1D5DB',
              background: filtroTipo === tipo ? '#1F2937' : '#FFFFFF',
              color: filtroTipo === tipo ? '#FFFFFF' : '#374151',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Lista compacta */}
      {ofertasFiltradas.length > 0 ? (
        ofertasFiltradas.map(pub => (
          <OfferCard 
            key={pub.id} 
            oferta={pub} 
            onVerDetalle={onVerDetalle}
            estaSeleccionada={ofertaDetalle?.id === pub.id}
          />
        ))
      ) : (
        <p style={{ color: '#9CA3AF', fontSize: '0.85rem', fontStyle: 'italic', textAlign: 'center', marginTop: '30px' }}>
          No hay publicaciones de tipo "{filtroTipo}" en esta estación.
        </p>
      )}
    </div>
  );
}