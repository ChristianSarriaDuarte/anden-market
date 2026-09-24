import React, { useState } from 'react';
import { TODAS_LAS_ESTACIONES, LINEAS_METRO } from '../data/metroConfig';

function getEstiloTiempo(horas) {
  if (horas > 48) return { bg: '#DCFCE7', color: '#166534', border: '#86EFAC' };
  if (horas >= 24) return { bg: '#FEF9C3', color: '#854D0E', border: '#FDE047' };
  return { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' };
}

const MAX_CARACTERES_DESC = 160;

export default function MisPublicaciones({ publicaciones, onCrearPublicacion, onEditarPublicacion, onEliminarPublicacion }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [telefono, setTelefono] = useState('56912345678');
  const [imagen, setImagen] = useState('');
  const [lineaSeleccionada, setLineaSeleccionada] = useState('L1');
  const [estacionTemp, setEstacionTemp] = useState('');
  const [estacionesAñadidas, setEstacionesAñadidas] = useState([]);
  const [mensajeExito, setMensajeExito] = useState('');

  // Estaciones que pasan por la línea seleccionada en el selector
  const estacionesDeLaLinea = TODAS_LAS_ESTACIONES.filter(e => e.lineas.includes(lineaSeleccionada));

  const getColorLinea = (codLinea) => {
    const l = LINEAS_METRO.find(item => item.id === codLinea);
    return l ? l.color : '#374151';
  };

  // Abrir formulario nuevo precargando perfil si existe
  const handleAbrirNuevoFormulario = () => {
    setIdEditando(null);
    setTitulo('');
    setPrecio('');
    setDescripcion('');
    setImagen('');

    const perfilRaw = localStorage.getItem('anden_perfil');
    if (perfilRaw) {
      try {
        const perfil = JSON.parse(perfilRaw);
        setTelefono(perfil.telefono || '56912345678');
        
        if (perfil.estacionHabitual) {
          const estHabitualObj = TODAS_LAS_ESTACIONES.find(e => Number(e.id) === Number(perfil.estacionHabitual));
          if (estHabitualObj) {
            setEstacionesAñadidas([estHabitualObj]);
          } else {
            setEstacionesAñadidas([]);
          }
        } else {
          setEstacionesAñadidas([]);
        }
      } catch (err) {
        setTelefono('56912345678');
        setEstacionesAñadidas([]);
      }
    } else {
      setTelefono('56912345678');
      setEstacionesAñadidas([]);
    }

    setMostrarFormulario(true);
  };

  const handleAñadirEstacion = () => {
    if (!estacionTemp) return;
    if (estacionesAñadidas.length >= 3) {
      alert("Máximo 3 estaciones permitidas por publicación.");
      return;
    }
    const estacionObj = TODAS_LAS_ESTACIONES.find(e => e.id === Number(estacionTemp));
    if (!estacionObj) return;

    if (estacionesAñadidas.some(e => e.id === estacionObj.id)) {
      alert(`La estación "${estacionObj.nombre}" ya está agregada.`);
      return;
    }

    setEstacionesAñadidas([...estacionesAñadidas, estacionObj]);
    setEstacionTemp('');
  };

  const handleRemoverEstacion = (id) => {
    setEstacionesAñadidas(estacionesAñadidas.filter(e => e.id !== id));
  };

  const iniciarEdicion = (pub) => {
    setIdEditando(pub.id);
    setTitulo(pub.titulo);
    setPrecio(pub.precio);
    setDescripcion(pub.descripcion);
    setTelefono(pub.telefono);
    setImagen(pub.imagen || '');
    
    const ids = Array.isArray(pub.estaciones) ? pub.estaciones : [pub.id_estacion];
    const previas = ids
      .map(id => TODAS_LAS_ESTACIONES.find(e => Number(e.id) === Number(id)))
      .filter(Boolean);
    setEstacionesAñadidas(previas);
    
    setMostrarFormulario(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFormulario = () => {
    setIdEditando(null);
    setTitulo('');
    setPrecio('');
    setDescripcion('');
    setImagen('');
    setEstacionesAñadidas([]);
    setMostrarFormulario(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (estacionesAñadidas.length === 0) {
      alert("Debes añadir al menos 1 estación de entrega.");
      return;
    }

    const idsEstaciones = estacionesAñadidas.map(e => Number(e.id));

    // Obtener alias del perfil actual si existe
    let vendedorAlias = 'Vendedor';
    const perfilRaw = localStorage.getItem('anden_perfil');
    if (perfilRaw) {
      try {
        const perfil = JSON.parse(perfilRaw);
        if (perfil.alias) vendedorAlias = perfil.alias;
      } catch (err) {}
    }

    if (idEditando) {
      const publicacionActualizada = {
        id: idEditando,
        titulo,
        precio: parseInt(precio, 10),
        tipo: 'Producto',
        descripcion,
        telefono: telefono.replace(/\s+/g, ''),
        estaciones: idsEstaciones,
        id_estacion: idsEstaciones[0],
        imagen: imagen.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
      };
      onEditarPublicacion(publicacionActualizada);
      setMensajeExito('✓ Publicación actualizada con éxito.');
    } else {
      const nueva = {
        id: Date.now(),
        creadoEn: Date.now(), // Timestamp base para caducidad real
        vendedor: vendedorAlias,
        titulo,
        precio: parseInt(precio, 10),
        tipo: 'Producto',
        descripcion,
        telefono: telefono.replace(/\s+/g, ''),
        horasRestantes: 72,
        estaciones: idsEstaciones,
        id_estacion: idsEstaciones[0],
        esPropia: true,
        imagen: imagen.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
      };
      onCrearPublicacion(nueva);
      setMensajeExito('✓ ¡Publicación creada con éxito!');
    }

    resetFormulario();
    setTimeout(() => setMensajeExito(''), 4000);
  };

  const misAvisos = publicaciones.filter(p => p.esPropia || p.id > 1000);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#111827', margin: '0 0 6px 0' }}>
            Mis Publicaciones
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
            Administra tus avisos vigentes en circulación o crea una nueva oferta.
          </p>
        </div>

        <button
          onClick={() => {
            if (mostrarFormulario) resetFormulario();
            else handleAbrirNuevoFormulario();
          }}
          style={{
            background: mostrarFormulario ? '#4B5563' : '#E31B23',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {mostrarFormulario ? '✕ Cancelar' : '+ Nueva Publicación'}
        </button>
      </div>

      {mensajeExito && (
        <div style={{ background: '#DCFCE7', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
          {mensajeExito}
        </div>
      )}

      {/* FORMULARIO */}
      {mostrarFormulario && (
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#1F2937' }}>
            {idEditando ? 'Editar Publicación' : 'Crear Anuncio (72 Horas)'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>Título</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Teclado Mecánico RGB 60%"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>Precio (CLP)</label>
                <input
                  type="number"
                  required
                  min="100"
                  placeholder="Ej: 25000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>WhatsApp</label>
                <input
                  type="text"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>URL Foto (opcional)</label>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/foto.jpg"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#374151' }}>Descripción</label>
                <span style={{ fontSize: '0.75rem', color: descripcion.length >= MAX_CARACTERES_DESC ? '#DC2626' : '#9CA3AF' }}>
                  {descripcion.length} / {MAX_CARACTERES_DESC}
                </span>
              </div>
              <textarea
                required
                maxLength={MAX_CARACTERES_DESC}
                placeholder="Detalles y condiciones de entrega..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                style={{
                  width: '100%',
                  height: '75px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  resize: 'none'
                }}
              />
            </div>

            {/* Selector de estaciones con soporte multilínea */}
            <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '14px', marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                Puntos de Entrega (Añade hasta 3 estaciones físicas)
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <select
                  value={lineaSeleccionada}
                  onChange={(e) => { setLineaSeleccionada(e.target.value); setEstacionTemp(''); }}
                  style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                >
                  {LINEAS_METRO.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
                </select>

                <select
                  value={estacionTemp}
                  onChange={(e) => setEstacionTemp(e.target.value)}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                >
                  <option value="">-- Elige estación --</option>
                  {estacionesDeLaLinea.map(e => {
                    const yaAgregada = estacionesAñadidas.some(item => item.id === e.id);
                    return (
                      <option key={e.id} value={e.id} disabled={yaAgregada}>
                        {e.nombre} {e.lineas.length > 1 ? `[Comb. ${e.lineas.join('/')}]` : ''} {yaAgregada ? '(Añadida)' : ''}
                      </option>
                    );
                  })}
                </select>

                <button
                  type="button"
                  onClick={handleAñadirEstacion}
                  disabled={estacionesAñadidas.length >= 3}
                  style={{ padding: '8px 14px', background: '#1F2937', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  + Añadir
                </button>
              </div>

              {/* Chips de estaciones seleccionadas */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {estacionesAñadidas.map(est => (
                  <span key={est.id} style={{ background: '#FFFFFF', border: '1px solid #D1D5DB', padding: '4px 10px', borderRadius: '16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {est.lineas.map(lin => (
                        <span key={lin} style={{ width: '8px', height: '8px', borderRadius: '50%', background: getColorLinea(lin) }} />
                      ))}
                    </div>
                    <strong>{est.nombre}</strong>
                    <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>({est.lineas.join('/')})</span>
                    <button type="button" onClick={() => handleRemoverEstacion(est.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" style={{ width: '100%', background: '#E31B23', color: '#FFFFFF', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {idEditando ? 'Guardar Cambios' : 'Confirmar y Publicar'}
            </button>
          </form>
        </div>
      )}

      {/* LISTADO DE PUBLICACIONES ACTIVAS */}
      <div>
        <h3 style={{ fontSize: '1.2rem', color: '#1F2937', marginBottom: '16px' }}>
          Tus Publicaciones en Circulación ({misAvisos.length})
        </h3>

        {misAvisos.length === 0 ? (
          <div style={{ background: '#F9FAFB', border: '2px dashed #E5E7EB', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>📦</span>
            <p style={{ margin: '10px 0 0 0', color: '#6B7280', fontSize: '0.95rem' }}>
              No tienes publicaciones activas por el momento.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {misAvisos.map(pub => {
              const estiloTiempo = getEstiloTiempo(pub.horasRestantes || 72);
              
              const ids = Array.isArray(pub.estaciones) ? pub.estaciones : [pub.id_estacion];
              const estacionesNombres = ids
                .map(id => TODAS_LAS_ESTACIONES.find(e => Number(e.id) === Number(id)))
                .filter(Boolean);

              return (
                <div
                  key={pub.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={pub.imagen}
                      alt={pub.titulo}
                      style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', background: '#F3F4F6' }}
                    />
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#111827' }}>
                        {pub.titulo}
                      </h4>
                      <div style={{ color: '#059669', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '6px' }}>
                        ${Number(pub.precio).toLocaleString('es-CL')}
                      </div>

                      {/* Chips estaciones con multilínea */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {estacionesNombres.map(est => (
                          <span key={est.id} style={{ fontSize: '0.7rem', background: '#F3F4F6', color: '#374151', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ display: 'flex', gap: '2px' }}>
                              {est.lineas.map(lin => (
                                <span key={lin} style={{ width: '6px', height: '6px', borderRadius: '50%', background: getColorLinea(lin) }} />
                              ))}
                            </div>
                            {est.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      background: estiloTiempo.bg,
                      color: estiloTiempo.color,
                      border: `1px solid ${estiloTiempo.border}`,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontWeight: 'bold'
                    }}>
                      ⏳ {pub.horasRestantes || 72}h
                    </span>

                    <button
                      onClick={() => iniciarEdicion(pub)}
                      style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onEliminarPublicacion(pub.id)}
                      style={{ background: '#FEE2E2', color: '#991B1B', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Dar de baja
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}