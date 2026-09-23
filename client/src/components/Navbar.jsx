import React from 'react';

export default function Navbar() {
  return (
    <header style={{
      height: '56px',
      background: '#1F2937',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.3rem' }}>🚉</span>
        <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.02em' }}>
          Andén Market
        </h1>
      </div>
      <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
        Santiago Metro Network
      </span>
    </header>
  );
}