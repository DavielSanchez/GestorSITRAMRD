import React, { useState } from 'react';
import { toast } from 'react-toastify';

function RegistrarBuses({ isOpen, onClose, onBusesAdded }) {
  const [placa, SetPlaca] = useState('');
  const [modelo, SetModelo] = useState('');
  const [capacidad, SetCapacidad] = useState('');
  const [estado, SetEstado] = useState('');

  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!placa.trim().length) {
      toast.error('El campo de placa está vacío', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    if (!modelo.trim().length) {
      toast.error('El campo de modelo está vacío', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    if (!capacidad.trim().length) {
      toast.error('El campo de capacidad está vacío', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
    if (!estado.trim().length) {
      toast.error('El campo de estado está vacío', {
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
      const response = await fetch(`${API_LINK}/autobus/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placa,
          modelo,
          capacidad: parseInt(capacidad),
          estado,
          ubicacionActual: '',
          idRuta: null,
        }),
      });

      if (response.ok) {
        if (onBusesAdded) onBusesAdded();

        SetPlaca('');
        SetModelo('');
        SetCapacidad('');
        SetEstado('');

        onClose();
      } else {
        console.error('Error al registrar el bus');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-8 shadow-lg min-w-98 max-w-sm animate-modal">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Placa"
            value={placa}
            onChange={(e) => SetPlaca(e.target.value)}
            className="w-full h-12 bg-[#eff3fe] rounded-[5px] px-2 font-semibold text-[#6a62dc]"
          />
          <input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => SetModelo(e.target.value)}
            className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => SetCapacidad(e.target.value)}
            className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
          />

          {/* Dropdown para estado */}
          <select
            value={estado}
            onChange={(e) => SetEstado(e.target.value)}
            className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]">
            <option value="">Selecciona un estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
            Registrar Bus
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

export default RegistrarBuses;
