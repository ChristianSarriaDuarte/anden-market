import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const { signIn, signUp } = useAuth();
  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alias, setAlias] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [cargando, setCargando] = useState(false);

  if (!isOpen) return null;

  const limpiarYSalir = () => {
    setEmail('');
    setPassword('');
    setAlias('');
    setTelefono('');
    setErrorMsg('');
    setCargando(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setCargando(true);

    try {
      if (esRegistro) {
        const { error } = await signUp(email, password, {
          nombre: alias,
          telefono: telefono.startsWith('56') ? telefono : `56${telefono.replace(/\D/g, '')}`
        });
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
      limpiarYSalir();
    } catch (err) {
      setErrorMsg(
        err.message === 'Invalid login credentials' 
          ? 'Credenciales inválidas. Revisa correo y clave.' 
          : err.message
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) limpiarYSalir();
      }}
    >
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        position: 'relative',
        fontFamily: 'sans-serif'
      }}>
        {/* Botón Cerrar */}
        <button
          onClick={limpiarYSalir}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            border: 'none',
            background: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#6B7280'
          }}
        >
          ✕
        </button>

        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.3rem', color: '#111827', textAlign: 'center' }}>
          {esRegistro ? 'Crear Cuenta en Andén' : 'Ingresar a Andén Market'}
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#6B7280', textAlign: 'center' }}>
          {esRegistro ? 'Regístrate para publicar tus productos' : 'Inicia sesión con tu cuenta de vendedor'}
        </p>

        {errorMsg && (
          <div style={{
            background: '#FEE2E2',
            color: '#DC2626',
            border: '1px solid #FCA5A5',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            marginBottom: '14px'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {esRegistro && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
                  Nombre o Alias
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Christian Ventas"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
                  Celular WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="912345678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
                />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              autoComplete="off"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            style={{
              marginTop: '8px',
              background: '#E31B23',
              color: '#FFFFFF',
              border: 'none',
              padding: '11px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: cargando ? 'not-allowed' : 'pointer'
            }}
          >
            {cargando ? 'Procesando...' : (esRegistro ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </form>

        <div style={{ marginTop: '14px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setErrorMsg('');
            }}
            style={{ background: 'none', border: 'none', color: '#E31B23', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {esRegistro ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
}