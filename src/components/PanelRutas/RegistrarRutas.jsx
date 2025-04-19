import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import MapView from '../Map/MapView';
import { useBG, usePrimaryColors } from '../../ColorClass';

function RegistrarRutas({ isOpen, onClose, onBusesAdded }) {
  const [nombreRuta, SetNombreRuta] = useState('');
  const [coordenadas, SetCoordenadas] = useState('');
  const [tarifa, SetTarifa] = useState('');
  const [paradas, SetParadas] = useState('');
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [nombreLugar, setNombreLugar] = useState(null);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = usePrimaryColors(theme);
  const bgColor = useBG(theme);

  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const imagenStatica = (lat, lng) => {
    return (
      <img
        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+000(${lng},${lat})/${lng},${lat},14.20,0,0/600x400?access_token=pk.eyJ1IjoibmVvZGV2IiwiYSI6ImNtOGQ4ZmIxMzBtc2kybHBzdzNxa3U4eDcifQ.1Oa8lXU045VvFUul26Kwkg`}
        alt="Imagen Estatica"
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!nombreRuta.trim().length) {
    //   toast.error(`El campo de nombre de ruta está vacío`, {
    //     position: 'bottom-center',
    //     autoClose: 3000,
    //   });
    // }
    // if (!tarifa.trim().length) {
    //   toast.error(`El campo de tarifa está vacío`, { position: 'bottom-center', autoClose: 3000 });
    // }

    try {
      const response = await fetch(`${API_LINK}/ruta/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreRuta,
          coordenadas,
          paradas,
          tarifa: parseInt(tarifa),
        }),
      });

      if (response.ok) {
        if (onBusesAdded) onBusesAdded();

        SetNombreRuta('');
        SetCoordenadas('');
        SetTarifa('');
        SetParadas('');
        onClose();
      } else {
        console.error('Error al registrar la incidencia');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  // Esta función se usará cuando se haga clic en el mapa
  const handleMapClick = (lat, lng, nombre) => {
    const nuevaCoordenada = `${lat},${lng}`;
    const nuevasParadas = nombre || 'Parada desconocida';

    SetCoordenadas(nuevaCoordenada);
    SetParadas(nuevasParadas);

    setDestination({ lat, lng });
    setNombreLugar(nombre);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className={`bg-white text-black rounded-md p-8 shadow-lg min-w-96  flex animate-modal`}>
        
        {/* Mapa a la izquierda */}
        <div className="w-1/2 pr-4">
          <div className="w-full h-full overflow-hidden rounded-md">
            <MapView
              onLocationSelect={(coords) => {
                const { lat, lng, nombre } = coords;
                handleMapClick(lat, lng, nombre);
              }}
            />
          </div>
        </div>
  
        {/* Inputs a la derecha */}
        <div className="w-1/2 pl-4 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre Ruta"
              value={nombreRuta}
              onChange={(e) => SetNombreRuta(e.target.value)}
              className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
            />
            <input
              type="number"
              placeholder="Tarifa"
              value={tarifa}
              onChange={(e) => SetTarifa(e.target.value)}
              className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
            />
            <button type="submit" className="bg-[#6a62dc]  text-white rounded-md py-2 mt-2">
              Registrar Ruta
            </button>
            <button
            onClick={onClose}
            className="bg-[#FF5353] cursor-pointer w-full text-white rounded-md py-2 mt-4">
            Cerrar
          </button>
          </form>
  
          
        </div>
  
      </div>
    </div>
  );
}

export default RegistrarRutas;
