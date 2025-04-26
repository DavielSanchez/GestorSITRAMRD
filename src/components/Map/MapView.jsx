import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RouteModal from './modal/RouteModal';
import DirectionModal from './modal/DirectionModal';
import actividad from './utils/actividad';
import useActividadStore from './store/useActividadStore.js';

function MapView({onLocationSelect, onMarkerCreated, marcadores = [] }) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);


  const [activeMarkers, setActiveMarkers] = useState([]);


  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg';

    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-69.93504763767407, 18.479794498094996],
      zoom: 12,
    });

    setMap(initialMap);

    initialMap.on('contextmenu', (e) => {
      const { lng, lat } = e.lngLat;

      // Crear marcador visual
      const marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(initialMap);

       // Guardar el marcador
       setActiveMarkers((prev) => [...prev, marker]);

      // Notificar al padre sobre coordenadas y marcador
      if (onLocationSelect) {
        onLocationSelect({ lng, lat });

        // Nuevo: notificar sobre el marcador
        if (onMarkerCreated) {
          onMarkerCreated(marker);
        }
      }
    });

    return () => {
      if (initialMap) {
        initialMap.remove();
      }
    };
  }, []);

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          if (map) {
            map.flyTo({
              center: [longitude, latitude],
              zoom: 14,
            });

            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } else {
      console.error('Geolocalización no está soportada en este navegador.');
    }
  };



  return (
    <div>
      <button onClick={handleLocateMe} style={{ backgroundColor: '#6a62dc', borderRadius: '5px', padding: '5px', position: 'absolute', top: '60px', left: '160px', zIndex: 80 }}>
        Localízame
      </button>

      <button style={{ backgroundColor: '#6a62dc', borderRadius: '5px', padding: '5px', position: 'absolute', top: '60px', left: '280px', zIndex: 80 }}>Mostrar rutas de autobús</button>

      <button style={{ backgroundColor: '#6a62dc', borderRadius: '5px', padding: '5px', position: 'absolute', top: '60px', left: '500px', zIndex: 80 }}>Mostrar rutas de metro</button>

      <div ref={mapContainerRef} style={{ width: '70vw', height: '80vh' }} />
    </div>
  );
}

export default MapView;
