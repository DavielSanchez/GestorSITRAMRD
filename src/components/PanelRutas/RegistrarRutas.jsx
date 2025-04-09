import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import {useBG,usePrimaryColors} from '../../ColorClass'

function RegistrarRutas({ isOpen, onClose, onBusesAdded }) {
  const [nombreRuta, SetNombreRuta] = useState('');
  const [coordenadas, SetCoordenadas] = useState('');
  const [tarifa, SetTarifa] = useState('');
  const [paradas, SetParadas] = useState('');
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = usePrimaryColors(theme);
  const bgColor = useBG(theme);

  // Endpoint de la API
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  // Función para manejar el submit del formulario, con validaciones
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRuta.trim().length) {
      toast.error(`El campo de nombre de ruta está vacío`, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    if (!coordenadas.trim().length) {
      toast.error(`El campo de modelo está vacío`, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    if (!tarifa.trim().length) {
      toast.error(`El campo de tarifa está vacío`, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    if (!paradas.trim().length) {
      toast.error(`El campo de parada está vacío`, {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }

    try {
      const response = await fetch(`${API_LINK}/ruta/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreRuta,
          coordenadas,
          paradas,
          tarifa: parseInt(capacidad),
        }),
      });

      if (response.ok) {
        // Notifica al padre para refrescar la tabla, si así lo deseas
        if (onBusesAdded) onBusesAdded();

        SetNombreRuta('');
        SetCoordenadas('');
        SetTarifa('');
        SetParadas('');

        // Cierra el modal
        onClose();
      } else {
        console.error('Error al registrar la incidencia');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  // Si el modal está cerrado, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      {/* Contenedor del contenido del modal */}
      <div className={ `${bgColor} rounded-md p-8 shadow-lg min-w-98 max-w-sm animate-modal`}>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campos para registrar autobuses */}
          <input
            type="text"
            placeholder="Nombre Ruta"
            value={nombreRuta}
            onChange={(e) => SetNombreRuta(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold ${textColor}`}
          />
          <input
            placeholder="Coordenadas"
            value={coordenadas}
            onChange={(e) => SetCoordenadas(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold ${textColor}`}
          />
          <input
            type="number"
            placeholder="Tarifa"
            value={tarifa}
            onChange={(e) => SetTarifa(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold ${textColor}`}
          />
          <input
            placeholder="Paradas"
            value={paradas}
            onChange={(e) => SetParadas(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold ${textColor}`}
          />

          {/* Botón Registrar */}
          <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
            Registrar Ruta
          </button>
        </form>

        {/* Opcional: Botón para cerrar manualmente */}
        <button
          onClick={onClose}
          className="bg-[#FF5353] cursor-pointer w-full text-white rounded-md py-2 mt-2">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default RegistrarRutas;
