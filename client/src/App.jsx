import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import OffersDrawer from './components/OffersDrawer';
import OfferDetailCard from './components/OfferDetailCard';
import { SAMPLE_OFFERS } from './data/sampleOffers';

// Vista 1: Mapa interactivo + Drawer + Tarjeta de Detalle Flotante
function VistaMapa() {
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(null);
  const [ofertaDetalle, setOfertaDetalle] = useState(null);

  const handleSelectEstacion = (estacion) => {
    setEstacionSeleccionada(estacion);
    setOfertaDetalle(null); // Si cambia de estación, cerramos el detalle previo
  };

  return (
    <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 56px)', overflow: 'hidden', position: 'relative' }}>
      {/* Contenedor del mapa con la tarjeta flotante encima */}
      <div style={{ flex: 1, position: 'relative', height: '100%' }}>
        <MapView onSelectEstacion={handleSelectEstacion} />
        
        {/* Tarjeta flotante de detalle */}
        <OfferDetailCard 
          oferta={ofertaDetalle} 
          onClose={() => setOfertaDetalle(null)} 
          estacion={estacionSeleccionada}
        />
      </div>

      {/* Panel lateral */}
      <OffersDrawer 
        estacion={estacionSeleccionada} 
        publicaciones={SAMPLE_OFFERS} 
        ofertaDetalle={ofertaDetalle}
        onVerDetalle={setOfertaDetalle}
      />
    </div>
  );
}

// Vista 2: Por Línea
function VistaLineas() {
  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Explorador por Línea</h2>
      <p style={{ color: '#6B7280' }}>Selecciona una línea para revisar todas sus publicaciones activas.</p>
    </div>
  );
}

// Vista 3: Mis Publicaciones y Crear Anuncio
function VistaMisPublicaciones() {
  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Mis Publicaciones</h2>
      <p style={{ color: '#6B7280' }}>Gestiona tus avisos en circulación o crea uno nuevo.</p>
    </div>
  );
}

// Vista 4: Perfil
function VistaPerfil() {
  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Mi Perfil</h2>
      <p style={{ color: '#6B7280' }}>Configuración de cuenta y número de contacto de WhatsApp.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/mapa" replace />} />
          <Route path="/mapa" element={<VistaMapa />} />
          <Route path="/lineas" element={<VistaLineas />} />
          <Route path="/mis-publicaciones" element={<VistaMisPublicaciones />} />
          <Route path="/perfil" element={<VistaPerfil />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}