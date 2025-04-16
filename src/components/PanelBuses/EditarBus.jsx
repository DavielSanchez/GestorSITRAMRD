import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useBG, usePrimaryColors } from '../../ColorClass';

function EditarBus({ isOpen, onClose, autobus, onAutobusUpdated, API_LINK }) {
  const [placa, setPlaca] = useState(autobus?.placa || '');
  const [modelo, setModelo] = useState(autobus?.modelo || '');
  const [capacidad, setCapacidad] = useState(autobus?.capacidad || '');
  const [estado, setEstado] = useState(autobus?.estado || '');
  const [idRuta, setIdRuta] = useState(autobus?.idRuta || '');
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = usePrimaryColors(theme);
  const bgColor = useBG(theme);

  useEffect(() => {
    if (autobus) {
      setPlaca(autobus.placa);
      setModelo(autobus.modelo);
      setCapacidad(autobus.capacidad);
      setEstado(autobus.estado);
      setIdRuta(autobus.idRuta || '');
    }
  }, [autobus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/autobus/update/${autobus._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placa,
          modelo,
          capacidad: parseInt(capacidad),
          estado,
          idRuta: idRuta || null,
        }),
      });

      if (response.ok) {
        if (onAutobusUpdated) onAutobusUpdated();
        onClose();
      } else {
        console.error('Error al actualizar el autobús');
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
            placeholder="Placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />

          {/* Dropdown para estado */}
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}>
            <option value="">Selecciona un estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <input
            type="text"
            placeholder="ID Ruta (Opcional)"
            value={idRuta}
            onChange={(e) => setIdRuta(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
            Guardar Cambios
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

export default EditarBus;
