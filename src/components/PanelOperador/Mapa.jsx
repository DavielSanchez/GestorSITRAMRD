import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CircularProgress } from "@mui/material";

// Iconos por defecto
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente que mueve el mapa cuando cambia la ubicación
function MoverAlUsuario({ posicion }) {
  const map = useMap();

  useEffect(() => {
    if (posicion) {
      map.setView(posicion, 13); // Mueve el mapa al marcador con zoom 13
    }
  }, [posicion, map]);

  return null;
}

function Mapa() {
  const [posicionUsuario, setPosicionUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosicionUsuario([latitude, longitude]);
        setTimeout(() => setLoading(false), 2000);
      },
      (err) => {
        console.error("Error obteniendo la ubicación:", err);
        setPosicionUsuario([18.4861, -69.9312]);
        setTimeout(() => setLoading(false), 2000);
      }
    );
  }, []);

  return (
    <div className="md:col-span-4 bg-[#f1f1ff] shadow rounded-lg p-3">
      <h3 className="text-2xl font-semibold text-[#6A62DC] mb-1">Rutas</h3>
      <div className="w-full" style={{ height: '500px' }}>
        {posicionUsuario ? (
          <MapContainer
            center={posicionUsuario}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posicionUsuario}>
              <Popup>
                Aquí estoy 📍
              </Popup>
            </Marker>
            <MoverAlUsuario posicion={posicionUsuario} />
          </MapContainer>
        ) : (
          <div className="h-[400px] flex flex-col justify-center items-center">
            <CircularProgress />
            <p className="text-center font-bold text-xl text-[#6A62DC] mt-5">Obteniendo ubicación...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mapa;
