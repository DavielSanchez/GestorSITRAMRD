import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function ModalRegistrar({ isOpen, onClose, onIncidenciaAdded }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const [autobus, setAutobus] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/incidencia/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idAutoBus: autobus,
          descripcion,
          idUsuario: userId,
        }),
      });

      if (response.ok) {
        // Notifica al padre para refrescar la tabla, si así lo deseas
        if (onIncidenciaAdded) onIncidenciaAdded();

        // Limpia los campos
        setAutobus('');
        setDescripcion('');

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
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm
  ">
      <div className="bg-white rounded-md p-8 shadow-lg min-w-[300px] max-w-sm animate-modal">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Autobus"
            value={autobus}
            onChange={(e) => setAutobus(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-3 text-black placeholder:text-[#6a62dc]"
          />
          <textarea
            placeholder="Descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full h-[100px] bg-[#eff3fe] rounded-[5px] p-3 text-black placeholder:text-[#6a62dc]"
          />
          <button
            type="submit"
            className="bg-[#6a62dc] cursor-pointer text-white rounded-md py-2 mt-2">
            Registrar
          </button>
        </form>
        <button
          type="submit"
          onClick={onClose}
          className="bg-[#FF5353] cursor-pointer w-full text-white rounded-md py-2 mt-2">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalRegistrar;
