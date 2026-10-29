import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import OffersDrawer from './components/OffersDrawer';
import OfferDetailCard from './components/OfferDetailCard';
import MisPublicaciones from './components/MisPublicaciones';
import VistaLineas from './components/VistaLineas';
import VistaPerfil from './components/VistaPerfil';
import RutaProtegida from './components/RutaProtegida';
import { supabase } from './supabaseClient';

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

export default function App() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Consulta relacional a Supabase
  const cargarPublicaciones = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('publicaciones')
        .select(`
          id,
          titulo,
          precio,
          tipo,
          descripcion,
          imagen,
          creado_en,
          usuario_id,
          perfiles ( nombre, telefono ),
          publicacion_estaciones ( estacion_id )
        `)
        .order('creado_en', { ascending: false });

      if (error) throw error;

      // Adaptación de datos para compatibilidad directa con MapView, OffersDrawer y VistaLineas
      const formateadas = (data || []).map((pub) => ({
        id: pub.id,
        titulo: pub.titulo,
        precio: pub.precio,
        tipo: pub.tipo || 'Producto',
        descripcion: pub.descripcion || '',
        imagen: pub.imagen || '',
        usuario_id: pub.usuario_id,
        contacto_vendedor: pub.perfiles?.telefono || '',
        vendedor_nombre: pub.perfiles?.nombre || 'Vendedor Andén',
        estaciones: (pub.publicacion_estaciones || []).map((pe) => pe.estacion_id),
        estacionId: pub.publicacion_estaciones?.[0]?.estacion_id || null,
        creado_en: pub.creado_en
      }));

      setPublicaciones(formateadas);
    } catch (err) {
      console.error('Error al cargar publicaciones:', err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPublicaciones();
  }, [cargarPublicaciones]);

  const handleCrearPublicacion = async () => {
    await cargarPublicaciones();
  };

  const handleEditarPublicacion = async () => {
    await cargarPublicaciones();
  };

  const handleEliminarPublicacion = async (id) => {
    if (!window.confirm("¿Seguro que deseas dar de baja esta publicación?")) return;

    try {
      const { error } = await supabase
        .from('publicaciones')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPublicaciones(prev => prev.filter(pub => pub.id !== id));
    } catch (err) {
      alert("Error al eliminar publicación: " + err.message);
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
          {cargando ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              color: '#6B7280',
              fontSize: '0.95rem'
            }}>
              Cargando catálogo de estaciones...
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/mapa" replace />} />
              <Route path="/mapa" element={<VistaMapa publicaciones={publicaciones} />} />
              <Route path="/lineas" element={<VistaLineas publicaciones={publicaciones} />} />
              <Route 
                path="/mis-publicaciones" 
                element={
                  <RutaProtegida>
                    <MisPublicaciones 
                      publicaciones={publicaciones} 
                      onRecargar={cargarPublicaciones}
                      onCrearPublicacion={handleCrearPublicacion}
                      onEditarPublicacion={handleEditarPublicacion}
                      onEliminarPublicacion={handleEliminarPublicacion}
                    />
                  </RutaProtegida>
                } 
              />
              <Route 
                path="/perfil" 
                element={
                  <RutaProtegida>
                    <VistaPerfil />
                  </RutaProtegida>
                } 
              />
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}