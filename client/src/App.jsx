import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import OffersDrawer from './components/OffersDrawer';
import OfferDetailCard from './components/OfferDetailCard';
import MisPublicaciones from './components/MisPublicaciones';
import { SAMPLE_OFFERS } from './data/sampleOffers';
import VistaLineas from './components/VistaLineas';

// Vista 1: Mapa interactivo + Drawer + Tarjeta Detalle
function VistaMapa({ publicaciones }) {
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(null);
  const [ofertaDetalle, setOfertaDetalle] = useState(null);

  const handleSelectEstacion = (estacion) => {
    setEstacionSeleccionada(estacion);
    setOfertaDetalle(null);
  };

  return (
    <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 56px)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ flex: 1, position: 'relative', height: '100%', width: '100%' }}>
        <MapView onSelectEstacion={handleSelectEstacion} />
        <OfferDetailCard 
          oferta={ofertaDetalle} 
          estacion={estacionSeleccionada}
          onClose={() => setOfertaDetalle(null)} 
        />
      </div>

      <OffersDrawer 
        estacion={estacionSeleccionada} 
        publicaciones={publicaciones} 
        ofertaDetalle={ofertaDetalle}
        onVerDetalle={setOfertaDetalle}
      />
    </div>
  );
}


// Vista 4: Perfil (placeholder)
function VistaPerfil() {
  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Mi Perfil</h2>
      <p style={{ color: '#6B7280' }}>Configuración de cuenta y número de contacto de WhatsApp.</p>
    </div>
  );
}

export default function App() {
  const [publicaciones, setPublicaciones] = useState(() => {
    const guardadas = localStorage.getItem('anden_publicaciones');
    return guardadas ? JSON.parse(guardadas) : SAMPLE_OFFERS;
  });

  useEffect(() => {
    localStorage.setItem('anden_publicaciones', JSON.stringify(publicaciones));
  }, [publicaciones]);

  const handleCrearPublicacion = (nueva) => {
    setPublicaciones(prev => [nueva, ...prev]);
  };

  const handleEditarPublicacion = (publicacionEditada) => {
    setPublicaciones(prev =>
      prev.map(p => (p.id === publicacionEditada.id ? { ...p, ...publicacionEditada } : p))
    );
  };

  const handleEliminarPublicacion = (id) => {
    if (window.confirm("¿Seguro que deseas dar de baja esta publicación?")) {
      setPublicaciones(prev => prev.filter(pub => pub.id !== id));
    }
  };

  return (
    <BrowserRouter>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        fontFamily: 'sans-serif',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        <Navbar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/mapa" replace />} />
            <Route path="/mapa" element={<VistaMapa publicaciones={publicaciones} />} />
            <Route path="/lineas" element={<VistaLineas publicaciones={publicaciones} />} />
            <Route 
              path="/mis-publicaciones" 
              element={
                <MisPublicaciones 
                  publicaciones={publicaciones} 
                  onCrearPublicacion={handleCrearPublicacion}
                  onEditarPublicacion={handleEditarPublicacion}
                  onEliminarPublicacion={handleEliminarPublicacion}
                />
              } 
            />
            <Route path="/perfil" element={<VistaPerfil />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}