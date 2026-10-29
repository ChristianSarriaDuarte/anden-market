import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { TODAS_LAS_ESTACIONES, LINEAS_METRO } from '../data/metroConfig';

export default function VistaPerfil() {
  const { user } = useAuth();
  const [modoEdicion, setModoEdicion] = useState(false);

  // Estados del formulario
  const [alias, setAlias] = useState('');
  const [telefonoRaw, setTelefonoRaw] = useState(''); // Solo 9 dígitos
  const [lineaFiltro, setLineaFiltro] = useState('L1');
  const [estacionHabitual, setEstacionHabitual] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Cargar datos del usuario autenticado en Supabase
  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      const nombreUsuario = meta.nombre || meta.alias || '';
      setAlias(nombreUsuario);

      let numLimpio = (meta.telefono || '').replace(/\D/g, '');
      if (numLimpio.startsWith('56')) {
        numLimpio = numLimpio.slice(2);
      }
      setTelefonoRaw(numLimpio);

      if (meta.estacionHabitual) {
        setEstacionHabitual(String(meta.estacionHabitual));
        const estObj = TODAS_LAS_ESTACIONES.find(e => e.id === Number(meta.estacionHabitual));
        if (estObj && estObj.lineas.length > 0) {
          setLineaFiltro(estObj.lineas[0]);
        }
      } else {
        setEstacionHabitual('');
      }

      // Si el usuario no tiene datos guardados todavía, abrir edición
      if (!nombreUsuario) {
        setModoEdicion(true);
      } else {
        setModoEdicion(false);
      }
    }
  }, [user]);

  const getColorLinea = (cod) => {
    const l = LINEAS_METRO.find(item => item.id === cod);
    return l ? l.color : '#E31B23';
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    const digitos = telefonoRaw.replace(/\D/g, '');
    if (digitos.length !== 9) {
      alert("Por favor ingresa un número celular válido de 9 dígitos (ej: 971960848).");
      return;
    }

    setGuardando(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          nombre: alias.trim() || 'Vendedor Anónimo',
          alias: alias.trim() || 'Vendedor Anónimo',
          telefono: `56${digitos}`,
          telefonoDisplay: digitos,
          estacionHabitual: estacionHabitual ? Number(estacionHabitual) : null
        }
      });

      if (error) throw error;

      setModoEdicion(false);
      setMensajeExito('✓ Perfil guardado correctamente.');
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (err) {
      alert("Error al guardar perfil: " + err.message);
    } finally {
      setGuardando(false);
    }
  };

  const perfil = user?.user_metadata;
  const tieneDatos = perfil?.nombre || perfil?.alias;
  const estacionesDeLaLinea = TODAS_LAS_ESTACIONES.filter(e => e.lineas.includes(lineaFiltro));
  const estacionHabitualObj = perfil?.estacionHabitual 
    ? TODAS_LAS_ESTACIONES.find(e => e.id === Number(perfil.estacionHabitual)) 
    : null;

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', padding: '36px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#111827', margin: '0 0 6px 0' }}>
            Mi Perfil de Vendedor
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
            Sesión iniciada como: <strong style={{ color: '#111827' }}>{user?.email}</strong>
          </p>
        </div>

        {tieneDatos && (
          <button
            onClick={() => setModoEdicion(!modoEdicion)}
            style={{
              background: modoEdicion ? '#4B5563' : '#1F2937',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {modoEdicion ? '✕ Cancelar' : '⚙ Configurar'}
          </button>
        )}
      </div>

      {mensajeExito && (
        <div style={{
          background: '#DCFCE7',
          color: '#166534',
          border: '1px solid #86EFAC',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          {mensajeExito}
        </div>
      )}

      {/* ESTADO 1: FICHA VISUAL DEL PERFIL */}
      {!modoEdicion && tieneDatos && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '28px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEE2E2',
              color: '#E31B23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 'bold'
            }}>
              {(alias || user?.email || 'V').charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.3rem', color: '#111827' }}>
                {alias}
              </h3>
              <span style={{ fontSize: '0.8rem', background: '#F3F4F6', color: '#4B5563', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                Vendedor Verificado Andén
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid #F3F4F6', paddingTop: '20px' }}>
            
            {/* Correo Electrónico Registrado */}
            <div>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block', marginBottom: '2px' }}>Correo de la cuenta:</span>
              <strong style={{ fontSize: '1rem', color: '#111827' }}>{user?.email}</strong>
            </div>

            {/* WhatsApp */}
            <div>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block', marginBottom: '2px' }}>WhatsApp de contacto:</span>
              <strong style={{ fontSize: '1rem', color: '#111827' }}>
                {telefonoRaw ? `+56 ${telefonoRaw}` : 'Sin teléfono configurado'}
              </strong>
            </div>

            {/* Estación habitual */}
            <div>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block', marginBottom: '6px' }}>Estación habitual de entrega:</span>
              {estacionHabitualObj ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#111827' }}>
                    📍 {estacionHabitualObj.nombre}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {estacionHabitualObj.lineas.map(lin => (
                      <span
                        key={lin}
                        style={{
                          background: getColorLinea(lin),
                          color: '#FFFFFF',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {lin}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <span style={{ fontSize: '0.9rem', color: '#9CA3AF', fontStyle: 'italic' }}>
                  No has definido una estación habitual aún.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ESTADO 2: FORMULARIO DE EDICIÓN O CREACIÓN */}
      {modoEdicion && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '28px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          {!tieneDatos && (
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', color: '#1E40AF', fontSize: '0.85rem' }}>
              ℹ️ Configura tu perfil de vendedor para autocompletar tus publicaciones.
            </div>
          )}

          <h3 style={{ margin: '0 0 18px 0', fontSize: '1.15rem', color: '#1F2937' }}>
            {tieneDatos ? 'Editar Datos de Vendedor' : 'Registrar Perfil'}
          </h3>

          <form onSubmit={handleGuardar}>
            {/* Campo Informativo: Correo Registrado */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>
                Correo Registrado
              </label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB',
                  background: '#F3F4F6',
                  color: '#6B7280',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            {/* Alias */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>
                Alias o Nombre Público
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Seba_Gamer, Cami_Ventas"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* WhatsApp con prefijo fijo +56 */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '6px' }}>
                WhatsApp Predeterminado
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  background: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  borderRight: 'none',
                  padding: '10px 12px',
                  borderTopLeftRadius: '6px',
                  borderBottomLeftRadius: '6px',
                  color: '#374151',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  🇨🇱 +56
                </span>
                <input
                  type="tel"
                  required
                  maxLength={9}
                  placeholder="971960848"
                  value={telefonoRaw}
                  onChange={(e) => setTelefonoRaw(e.target.value.replace(/\D/g, ''))}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', marginTop: '4px' }}>
                Ingresa los 9 dígitos de tu número celular sin espacios.
              </span>
            </div>

            {/* Selector de Estación Habitual (Línea -> Estación) */}
            <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '14px', marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                Estación Habitual de Entrega
              </label>

              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={lineaFiltro}
                  onChange={(e) => {
                    setLineaFiltro(e.target.value);
                    setEstacionHabitual('');
                  }}
                  style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                >
                  {LINEAS_METRO.map(l => (
                    <option key={l.id} value={l.id}>{l.nombre}</option>
                  ))}
                </select>

                <select
                  value={estacionHabitual}
                  onChange={(e) => setEstacionHabitual(e.target.value)}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                >
                  <option value="">-- Sin estación habitual --</option>
                  {estacionesDeLaLinea.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.nombre} {e.lineas.length > 1 ? `[Comb. ${e.lineas.join('/')}]` : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={guardando}
              style={{
                width: '100%',
                background: '#E31B23',
                color: '#FFFFFF',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                cursor: guardando ? 'not-allowed' : 'pointer'
              }}
            >
              {guardando ? 'Guardando en Supabase...' : 'Guardar y Ver Perfil'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}