import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import MapView from '../Map/MapView';

function RegistrarUser({ isOpen, onClose, onBusesAdded }) {
  const [nombre, SetNombre] = useState('');
  const [correo, SetCorreo] = useState('');
  const [estado, SetEstado] = useState('');

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;

  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim().length) {
      toast.error(`El campo de nombre de ruta está vacío`, {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
    if (!correo.trim().length) {
      toast.error(`El campo de correo está vacío`, { position: 'bottom-center', autoClose: 3000 });
    }

    try {
      const response = await fetch(`${API_LINK}/auth/users/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          correo: correo.toLowerCase(),
          estadoUsuario: estado,
        }),
      });

      if (response.ok) {
        if (onBusesAdded) onBusesAdded();

        SetNombre('');
        SetCorreo('');
      } else {
        console.error('Error al registrar el usuario la incidencia');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className={`bg-white rounded-md p-8 shadow-lg min-w-98 max-w-sm animate-modal`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre usuario"
            value={nombre}
            onChange={(e) => SetNombre(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <input
            placeholder="Correo"
            value={correo}
            onChange={(e) => SetCorreo(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <select
            value={estado}
            onChange={(e) => SetEstado(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}>
            <option value="">Selecciona un estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
           

          <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
            Registrar Usuario
          </button>
        </form>

        <button
          onClick={onClose}
          className="bg-[#FF5353] cursor-pointer w-full text-white rounded-md py-2 mt-2">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default RegistrarUser;
