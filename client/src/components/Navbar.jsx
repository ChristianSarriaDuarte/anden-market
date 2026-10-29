import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [modalAbierto, setModalAbierto] = useState(false);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#FFFFFF' : '#9CA3AF',
    background: isActive ? '#374151' : 'transparent',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  });

  return (
    <>
      <header style={{
        height: '56px',
        background: '#111827',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        zIndex: 1000
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🚉</span>
          <span style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
            Andén Market
          </span>
        </div>

        {/* Navegación por Rutas + Control de Sesión */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <nav style={{ display: 'flex', gap: '8px' }}>
            <NavLink to="/mapa" style={linkStyle}>
              Mapa
            </NavLink>
            <NavLink to="/lineas" style={linkStyle}>
              Por Línea
            </NavLink>
            <NavLink to="/mis-publicaciones" style={linkStyle}>
              Mis Publicaciones
            </NavLink>
            <NavLink to="/perfil" style={linkStyle}>
              Perfil
            </NavLink>
          </nav>

          {/* Separador vertical sutil */}
          <div style={{ width: '1px', height: '24px', background: '#374151' }} />

          {/* Estado de Autenticación */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#E5E7EB', fontSize: '0.85rem' }}>
                👤 {user.user_metadata?.nombre || user.email.split('@')[0]}
              </span>
              <button
                onClick={() => signOut()}
                style={{
                  background: '#374151',
                  color: '#F87171',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#4B5563')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#374151')}
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={() => setModalAbierto(true)}
              style={{
                background: '#E31B23',
                color: '#FFFFFF',
                border: 'none',
                padding: '7px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Ingresar
            </button>
          )}
        </div>
      </header>

      {/* Modal de autenticación */}
      <LoginModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
      />
    </>
  );
}