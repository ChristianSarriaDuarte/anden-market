import React, { useState, useMemo } from 'react';
import { LINEAS_METRO, TODAS_LAS_ESTACIONES } from '../data/metroConfig';
import OfferDetailCard from './OfferDetailCard';

function getEstiloTiempo(horas) {
  if (horas > 48) return { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' };
  if (horas >= 24) return { bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' };
  return { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' };
}

export default function VistaLineas({ publicaciones }) {
  const [lineaActiva, setLineaActiva] = useState('L1');
  const [filtroEstacion, setFiltroEstacion] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('recientes');
  const [ofertaDetalle, setOfertaDetalle] = useState(null);

  const infoLinea = LINEAS_METRO.find(l => l.id === lineaActiva) || LINEAS_METRO[0];
  
  // Estaciones físicas que pasan por la línea activa
  const estacionesDeEstaLinea = useMemo(() => {
    return TODAS_LAS_ESTACIONES.filter(e => e.lineas.includes(lineaActiva));
  }, [lineaActiva]);

  const setIdsEstacionesLinea = useMemo(() => {
    return new Set(estacionesDeEstaLinea.map(e => Number(e.id)));
  }, [estacionesDeEstaLinea]);

  // FILTRADO ESTRICTO
  const listaFinal = useMemo(() => {
    const query = busqueda.trim().toLowerCase();

    return publicaciones
      .filter(pub => {
        let idsPub = [];
        if (Array.isArray(pub.estaciones) && pub.estaciones.length > 0) {
          idsPub = pub.estaciones.map(Number);
        } else if (pub.id_estacion !== undefined && pub.id_estacion !== null) {
          idsPub = [Number(pub.id_estacion)];
        }

        // 1. Debe pertenecer a la línea activa
        const perteneceALinea = idsPub.some(id => setIdsEstacionesLinea.has(id));
        if (!perteneceALinea) return false;

        // 2. Filtro opcional por estación puntual
        if (filtroEstacion !== 'todas') {
          if (!idsPub.includes(Number(filtroEstacion))) return false;
        }

        // 3. Filtro por buscador de texto (SOLO TÍTULO)
        if (query !== '') {
          const matchTitulo = pub.titulo ? pub.titulo.toLowerCase().includes(query) : false;
          if (!matchTitulo) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (orden === 'urgencia') {
          return (Number(a.horasRestantes) || 72) - (Number(b.horasRestantes) || 72);
        }
        if (orden === 'precio') {
          return Number(a.precio) - Number(b.precio);
        }
        return Number(b.id || 0) - Number(a.id || 0);
      });
  }, [publicaciones, setIdsEstacionesLinea, filtroEstacion, busqueda, orden]);

  const handleCambiarLinea = (idLinea) => {
    setLineaActiva(idLinea);
    setFiltroEstacion('todas');
    setOfertaDetalle(null);
  };

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 56px)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Contenedor scrolleable */}
      <div style={{
        flex: 1,
        overflowY: 'scroll',
        padding: '24px 32px',
        paddingRight: ofertaDetalle ? '390px' : '32px',
        transition: 'padding-right 0.2s ease'
      }}>
        
        {/* Cabecera y Selector de Líneas */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#111827', margin: '0 0 12px 0' }}>
            Explorador por Línea
          </h2>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {LINEAS_METRO.map(linea => {
              const estaActiva = linea.id === lineaActiva;
              return (
                <button
                  key={linea.id}
                  onClick={() => handleCambiarLinea(linea.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: estaActiva ? `2px solid ${linea.color}` : '1px solid #D1D5DB',
                    background: estaActiva ? linea.color : '#FFFFFF',
                    color: estaActiva ? '#FFFFFF' : '#374151',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: estaActiva ? '#FFFFFF' : linea.color
                  }} />
                  {linea.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buscador + Selector Estación + Orden */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '16px',
          background: '#F9FAFB',
          padding: '12px 16px',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          flexWrap: 'wrap'
        }}>
          {/* Buscador */}
          <div style={{ flex: '1 1 240px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder={`Buscar en ${infoLinea.nombre} (ej: calcetas, cable)...`}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 36px 9px 12px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                title="Limpiar"
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: '#E5E7EB',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  color: '#4B5563',
                  fontWeight: 'bold'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtro opcional por estación */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold' }}>Estación:</span>
            <select
              value={filtroEstacion}
              onChange={(e) => setFiltroEstacion(e.target.value)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
                background: '#FFFFFF',
                maxWidth: '180px'
              }}
            >
              <option value="todas">Todas ({estacionesDeEstaLinea.length})</option>
              {estacionesDeEstaLinea.map(e => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          </div>

          {/* Ordenador */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'bold' }}>Ordenar:</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              style={{
                padding: '8px 10px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
                background: '#FFFFFF'
              }}
            >
              <option value="recientes">⏰ Más recientes</option>
              <option value="urgencia">🔥 Por vencer (&lt; 24h)</option>
              <option value="precio">💲 Menor precio</option>
            </select>
          </div>
        </div>

        {/* Contador */}
        <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '0 0 14px 0' }}>
          Mostrando <strong>{listaFinal.length}</strong> publicaciones activas en {infoLinea.nombre}
        </p>

        {/* Listado */}
        {listaFinal.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            border: '2px dashed #E5E7EB',
            borderRadius: '10px',
            padding: '40px 20px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <p style={{ margin: '8px 0 0 0', color: '#6B7280', fontSize: '0.9rem' }}>
              No hay publicaciones activas que coincidan en {infoLinea.nombre}.
            </p>
            {(busqueda || filtroEstacion !== 'todas') && (
              <button
                type="button"
                onClick={() => { setBusqueda(''); setFiltroEstacion('todas'); }}
                style={{
                  marginTop: '12px',
                  background: '#1F2937',
                  color: '#FFF',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Restablecer filtros
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {listaFinal.map(pub => {
              const estiloTiempo = getEstiloTiempo(pub.horasRestantes || 72);
              
              const ids = Array.isArray(pub.estaciones) && pub.estaciones.length > 0
                ? pub.estaciones.map(Number)
                : [Number(pub.id_estacion)];
                
              const estacionesPub = ids
                .map(id => TODAS_LAS_ESTACIONES.find(e => Number(e.id) === id))
                .filter(Boolean);

              const estacionesDeEstaLineaPub = estacionesPub.filter(e => e.lineas.includes(lineaActiva));
              const estacionesDeOtrasLineasPub = estacionesPub.filter(e => !e.lineas.includes(lineaActiva));

              const estaSeleccionada = ofertaDetalle?.id === pub.id;

              return (
                <div
                  key={pub.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: estaSeleccionada ? '#FEF2F2' : '#FFFFFF',
                    border: estaSeleccionada ? '1px solid #E31B23' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                  }}
                >
                  {/* Info izquierda */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0, alignItems: 'center' }}>
                      {estacionesDeEstaLineaPub.map(est => (
                        <span
                          key={est.id}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            background: '#FEE2E2',
                            color: '#991B1B',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}
                        >
                          📍 {est.nombre}
                        </span>
                      ))}

                      {estacionesDeOtrasLineasPub.length > 0 && (
                        <span
                          title={`También entrega en: ${estacionesDeOtrasLineasPub.map(e => e.nombre).join(', ')}`}
                          style={{
                            fontSize: '0.75rem',
                            color: '#6B7280',
                            background: '#F3F4F6',
                            padding: '3px 6px',
                            borderRadius: '4px'
                          }}
                        >
                          +{estacionesDeOtrasLineasPub.length} en otras líneas
                        </span>
                      )}
                    </div>

                    <span style={{
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                      color: '#111827',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '340px'
                    }}>
                      {pub.titulo}
                    </span>

                    <span style={{ fontSize: '0.75rem', background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#6B7280', padding: '2px 6px', borderRadius: '4px' }}>
                      {pub.tipo || 'Producto'}
                    </span>
                  </div>

                  {/* Info derecha */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#059669' }}>
                      ${Number(pub.precio).toLocaleString('es-CL')}
                    </span>

                    <span style={{
                      fontSize: '0.75rem',
                      background: estiloTiempo.bg,
                      color: estiloTiempo.color,
                      border: `1px solid ${estiloTiempo.border}`,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontWeight: 'bold'
                    }}>
                      ⏳ {pub.horasRestantes || 72}h
                    </span>

                    <button
                      type="button"
                      onClick={() => setOfertaDetalle(estaSeleccionada ? null : pub)}
                      style={{
                        padding: '6px 12px',
                        background: estaSeleccionada ? '#1F2937' : '#E31B23',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {estaSeleccionada ? 'Cerrar' : 'Ver detalle'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tarjeta flotante de detalle */}
      {ofertaDetalle && (
        <OfferDetailCard
          oferta={ofertaDetalle}
          onClose={() => setOfertaDetalle(null)}
        />
      )}

    </div>
  );
}