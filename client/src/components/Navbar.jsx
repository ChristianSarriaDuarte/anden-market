import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
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

      {/* Navegación por Rutas */}
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
    </header>
  );
}