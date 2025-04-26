import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';

function ModalNuevaAlerta({ isOpen, onClose, onIncidenciaAdded }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const socket = io(API_LINK);
  
  const [alerta, setAlerta] = useState({
    titulo: '',
    descripcion: '',
    userId,
    tipo: 'emergencia',
    color: '#ff0000',
    tipo_destinatario: 'todos',
    destinatarios: [],
    ruta_id: null,
  });

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Establecer escucha continua para nuevas alertas
  useEffect(() => {
    socket.on("nuevaAlerta", (alerta) => {
      if (alerta.destinatarios.includes(userId)) {
        console.log('Alerta nueva recibida:', alerta);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlerta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Emisión de la alerta directamente al servidor a través del socket
      socket.emit("nueva-alerta", {
        ...alerta,
        destinatarios: alerta.tipo_destinatario === 'usuario' ? alerta.destinatarios : [],
        userId,
      });

      // Ejecución de lo que ocurre después de enviar la alerta
      if (onIncidenciaAdded) onIncidenciaAdded();

      // Limpiar el estado de la alerta
      setAlerta({
        titulo: '',
        descripcion: '',
        tipo: 'emergencia',
        color: '#ff0000',
        tipo_destinatario: 'todos',
        destinatarios: [],
        ruta_id: '',
      });
      onClose();
    } catch (error) {
      console.error('Error en la emisión de la alerta:', error);
      setError('Hubo un error al procesar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-8 shadow-lg w-[350px] md:w-[600px] max-w-lg animate-modal">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-[#6a62dc] text-3xl flex justify-center w-full my-5">Nueva alerta</p>

          {/* Título */}
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={alerta.titulo}
            onChange={handleChange}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-3 text-black placeholder:text-[#6a62dc]"
            required
          />

          {/* Descripción */}
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={alerta.descripcion}
            onChange={handleChange}
            className="w-full h-[100px] min-h-[40px] max-h-[200px] bg-[#eff3fe] rounded-[5px] p-3 text-black placeholder:text-[#6a62dc]"
            required
          />

          {/* Tipo de alerta */}
          <div className="w-full bg-[#eff3fe] rounded-[5px] p-3 text-[#6a62dc]">
            <p className="text-md">Tipo de alerta</p>
            <div className="grid grid-cols-3 p-3 gap-2">
              {['emergencia', 'trafico', 'clima', 'operativa', 'informativa'].map((tipo) => (
                <label key={tipo} className="text-sm block">
                  <input
                    type="radio"
                    name="tipo"
                    value={tipo}
                    checked={alerta.tipo === tipo}
                    onChange={handleChange}
                  />
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Destinatarios */}
          <select
            name="tipo_destinatario"
            value={alerta.tipo_destinatario}
            onChange={handleChange}
            className="w-full text-[#6a62dc] h-[40px] bg-[#eff3fe] rounded-[5px] px-3 placeholder:text-[#6a62dc]">
            <option value="todos">Todos</option>
            <option value="operadores">Operadores</option>
            <option value="conductores">Conductores</option>
            <option value="conductores_ruta">Conductores de una ruta</option>
            <option value="usuarios_ruta">Todos los usuarios de una ruta</option>
            <option value="usuario">Usuario específico</option>
            <option value="administradores">Administradores</option>
          </select>

          {alerta.tipo_destinatario === 'usuario' && (
            <input
              type="text"
              placeholder="ID del usuario"
              value={alerta.destinatarios.join(',')}
              onChange={(e) => setAlerta({ ...alerta, destinatarios: e.target.value.split(',') })}
              className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-3 text-black placeholder:text-[#6a62dc]"
              required
            />
          )}

          {alerta.tipo_destinatario === 'conductores_ruta' || alerta.tipo_destinatario === 'usuarios_ruta' && (
            <input
              type="text"
              placeholder="ID de la ruta"
              name="ruta_id"
              value={alerta.ruta_id}
              onChange={handleChange}
              className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-3 text-black placeholder:text-[#6a62dc]"
              required
            />
          )}

          {alerta.tipo_destinatario === 'usuarios_ruta' && (
            <input
              type="text"
              placeholder="ID de la ruta"
              name="ruta_id"
              value={alerta.ruta_id}
              onChange={handleChange}
              className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-3 text-black placeholder:text-[#6a62dc]"
              required
            />
          )}

          {/* Mensaje de error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Botón para registrar */}
          <button
            type="submit"
            className="bg-[#6a62dc] cursor-pointer text-white rounded-md py-2 mt-2"
            disabled={loading}>
            {loading ? 'Cargando...' : 'Registrar'}
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

export default ModalNuevaAlerta;
