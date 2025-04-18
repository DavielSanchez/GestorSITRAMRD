import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useBG, usePrimaryColors } from '../../ColorClass';

function EditarRuta({ isOpen, onClose, ruta, onRutaUpdated, API_LINK }) {
  const [nombreRuta, setNombreRuta] = useState(ruta?.nombreRuta || '');
  const [coordenadas, setCoordenadas] = useState(ruta?.coordenadas || '');
  const [tarifa, setTarifa] = useState(ruta?.tarifa || '');
  const [paradas, setParadas] = useState(ruta?.paradas || '');
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = usePrimaryColors(theme);
  const bgColor = useBG(theme);

  useEffect(() => {
    if (ruta) {
      setNombreRuta(ruta.nombreRuta || '');
      setCoordenadas(ruta.coordenadas || '');
      setTarifa(ruta.tarifa || '');
      setParadas(ruta.paradas || '');
    }
  }, [ruta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/update/${ruta._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreRuta,
          coordenadas,
          Tarifa: tarifa,
          paradas,
        }),
      });

      if (response.ok) {
        if (onRutaUpdated) onRutaUpdated();
        onClose();
      } else {
        console.error('Error al actualizar la ruta');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm a">
      <div className={ `bg-white rounded-md p-8 shadow-lg min-w-98 max-w-sm animate-modal`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de la Ruta"
            value={nombreRuta}
            onChange={(e) => setNombreRuta(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <input
            type="text"
            placeholder="Coordenadas"
            value={coordenadas}
            onChange={(e) => setCoordenadas(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <input
            type="number"
            placeholder="Tarifa"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
          <input
            type="text"
            placeholder="Paradas"
            value={paradas}
            onChange={(e) => setParadas(e.target.value)}
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

export default EditarRuta;
