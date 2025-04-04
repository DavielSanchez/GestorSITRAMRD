import React, { useState, useEffect } from 'react';

const ModalEditar = ({ isOpen, onClose, incidencia, onEstadoUpdated, API_LINK }) => {
  const [nuevoEstado, setNuevoEstado] = useState('');

  // Inicializa el valor al abrir el modal con el estado original
  useEffect(() => {
    if (incidencia) {
      setNuevoEstado(incidencia.estado);
    }
  }, [incidencia]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_LINK}/incidencia/estado/${incidencia._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (response.ok) {
        onEstadoUpdated(incidencia._id, nuevoEstado);
        onClose();
      } else {
        alert('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error en la petición PUT:', error);
      alert('Error en la petición');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
  fixed inset-0 
  flex items-center justify-center 
  z-50
  bg-black/30 backdrop-blur-sm
">
      {/* Overlay sutil */}
      <div className=" bg-gray-100 opacity-70" onClick={onClose}></div>
      {/* Contenido del modal */}
      <div className="relative bg-white rounded p-6 w-80 shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-[#6a62dc]">Editar Estado de Incidencia</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-[#6a62dc] font-medium">Estado:</label>
          <select
            className="w-full p-2 border border-[#6a62dc] rounded mb-4 text-[#6a62dc] focus:outline-none focus:ring-2 focus:ring-[#6a62dc]"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Resuelto">Resuelto</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-[#6a62dc] w-full text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
              Actualizar
            </button>
          </div>
        </form>
        <button
          type="button"
          onClick={onClose}
          className="bg-[#FF5353] w-full text-white mt-2 px-4 py-2 rounded transition">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalEditar;
