import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        color: '#6B7280',
        fontFamily: 'sans-serif'
      }}>
        Comprobando sesión...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/mapa" replace />;
  }

  return children;
}