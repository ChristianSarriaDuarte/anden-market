import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import OffersDrawer from './components/OffersDrawer';
import { SAMPLE_OFFERS } from './data/sampleOffers';

export default function App() {
  const [estacionSeleccionada, setEstacionSeleccionada] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', fontFamily: 'sans-serif' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <MapView onSelectEstacion={setEstacionSeleccionada} />
        <OffersDrawer 
          estacion={estacionSeleccionada} 
          publicaciones={SAMPLE_OFFERS} 
        />
      </div>
    </div>
  );
}