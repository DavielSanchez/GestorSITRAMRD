import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import MapView from '../Map/MapView';
import { useBG, usePrimaryColors } from '../../ColorClass';

function RegistrarRutas({ isOpen, onClose, onBusesAdded }) {
  const [nombreRuta, SetNombreRuta] = useState('');
  const [coordenadas, SetCoordenadas] = useState([]);
  const [tarifa, SetTarifa] = useState('');
  const [paradas, SetParadas] = useState([]);
  const [marcadores, setMarcadores] = useState([]);
  const [estado, setEstado] = useState('activa'); // Nuevo estado
  const [tipo, setTipo] = useState(''); // Nuevo tipo


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paradaSeleccionada, setParadaSeleccionada] = useState(null);



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


  const limpiarParadas = (paradas) => {
    return paradas.map((p, i) => ({
      nombre: p.nombre || `Parada ${i + 1}`,
      descripcion: p.descripcion || '',
      ordenParada: i + 1,
      ubicacion: {
        type: 'Point',
        coordinates: p.ubicacion.coordinates,
      },
    }));
  };
  


  const handleOpenModal = (index) => {
    setParadaSeleccionada({ ...paradas[index], index }); // guardamos también el índice para saber cuál actualizar
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setParadaSeleccionada(null);
  };

  const handleSaveParada = () => {
    const updatedParadas = [...paradas];
    updatedParadas[paradaSeleccionada.index] = {
      ...paradaSeleccionada,
      ubicacion: {
        type: 'Point',
        coordinates: paradaSeleccionada.ubicacion.coordinates,
        ordenParada: paradaSeleccionada.ubicacion.ordenParada,
      },
    };
    SetParadas(updatedParadas);
    setIsModalOpen(false);
  };



  const handleAddParada = ({ lng, lat }) => {
    const nuevaParada = {
      nombre: '',
      descripcion: '',
      ubicacion: {
        type: 'Point',
        coordinates: [lng, lat],
        ordenParada: paradas.length + 1,
      },
    };
    
    SetParadas((prev) => [...prev, nuevaParada]); // ✅ agregando a las paradas

    SetCoordenadas((prev) => [...prev, [lng, lat]]); // ✅ agregando a las coordenadas
  };


  const handleMarkerCreated = (marker) => {
    setMarcadores((prev) => [...prev, marker]);
  };

  const handleDeleteCoord = (index) => {
    const nuevasCoordenadas = [...coordenadas];
    nuevasCoordenadas.splice(index, 1);
    SetCoordenadas(nuevasCoordenadas);

    const nuevasParadas = [...paradas];
    nuevasParadas.splice(index, 1);
    SetParadas(nuevasParadas);

    const nuevosMarcadores = [...marcadores];
    const marcadorAEliminar = nuevosMarcadores.splice(index, 1)[0];
    if (marcadorAEliminar) {
      marcadorAEliminar.remove(); // Eliminar del mapa
    }
    setMarcadores(nuevosMarcadores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rutaData = {
      nombreRuta,
      coordenadas: {
        type: 'LineString',
        coordinates: coordenadas,
      },
      paradas: limpiarParadas(paradas),
      Tarifa: parseInt(tarifa),
      tipo: tipo,
    };

    try {
      const response = await fetch(`${API_LINK}/ruta/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rutaData),
      });

      if (response.ok) {
        toast.success('Ruta registrada con éxito', { position: 'bottom-center' });

        if (onBusesAdded) onBusesAdded();

        SetNombreRuta('');
        SetCoordenadas([]);
        SetTarifa('');
        SetParadas([]);
        setMarcadores([]);
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error al registrar la ruta:', errorData.message);
        toast.error('No se pudo registrar la ruta', { position: 'bottom-center' });
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      toast.error('Error de red al registrar la ruta', { position: 'bottom-center' });
    }
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-8 shadow-lg min-w-96 flex animate-modal">

        {/* Mapa */}
        <div className="w-1/2 pr-4">
          <div className="w-full mt-10 h-full overflow-hidden rounded-md">
            <MapView
              onLocationSelect={handleAddParada}
              onMarkerCreated={handleMarkerCreated}
              marcadores={coordenadas}
            />

          </div>
        </div>

        {/* Formulario */}
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

            <div className="flex gap-4">
              {/* Campo tipo */}
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
              >
                <option value="Corredor">Corredor</option>
                <option value="Metro">Metro</option>
                <option value="Teleferico">Teleférico</option>
              </select> 

              {/* Campo estado */}
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
              >
                <option value="activa">Activa</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </div>



            <div className="bg-[#f0f4ff] p-3 rounded-md max-h-40 overflow-y-auto">
              <h3 className="text-[#6a62dc] font-semibold mb-2 text-sm">Coordenadas Agregadas</h3>
              <ul className="text-xs text-gray-700 list-decimal pl-4 space-y-2">
                {paradas.map((parada, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      Longitud: <span className="font-mono">{parada.ubicacion.coordinates[0].toFixed(6)}</span>,
                      Latitud: <span className="font-mono">{parada.ubicacion.coordinates[1].toFixed(6)}</span>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      <button
                        onClick={() => handleOpenModal(index)} // este index ahora está basado en paradas
                        className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 text-xs rounded-md"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => handleDeleteCoord(index)}
                        className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 text-xs rounded-md"
                      >
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>






            {/* Modal de edición de parada */}
            {isModalOpen && paradaSeleccionada && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
                <div className="bg-white rounded-md p-8 shadow-lg w-96">
                  <h3 className="text-lg font-semibold mb-4">Editar Parada</h3>
                  <input
                    type="text"
                    value={paradaSeleccionada.nombre}
                    onChange={(e) => setParadaSeleccionada({ ...paradaSeleccionada, nombre: e.target.value })}
                    placeholder="Nombre de la parada"
                    className="w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc] mb-8"
                  />
                  <textarea
                    value={paradaSeleccionada.descripcion}
                    onChange={(e) => setParadaSeleccionada({ ...paradaSeleccionada, descripcion: e.target.value })}
                    placeholder="Descripción"
                    className="w-full h-24 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]"
                  />

                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      <strong>Longitud:</strong> {paradaSeleccionada.ubicacion.coordinates[0].toFixed(6)}
                    </p>
                    <p>
                      <strong>Latitud:</strong> {paradaSeleccionada.ubicacion.coordinates[1].toFixed(6)}
                    </p>
                  </div>


                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={handleSaveParada}
                      className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 text-sm rounded-md"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 text-sm rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}










            <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
              Registrar Ruta
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#FF5353] cursor-pointer w-full text-white rounded-md py-2 mt-4"
            >
              Cerrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrarRutas;
