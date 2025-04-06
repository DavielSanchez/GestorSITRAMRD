import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function ModalNuevaAlerta({ isOpen, onClose, onIncidenciaAdded }) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const [alerta, setAlerta] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'emergencia',
    color: '#ff0000',
    tipo_destinatario: 'todos',
    destinatarios: [],
    ruta_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlerta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/alerta/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...alerta,
          destinatarios: alerta.tipo_destinatario === 'usuario' ? alerta.destinatarios : [],
          userId,
        }),
      });

      if (response.ok) {
        socket.emit("nueva-alerta", alerta);
        if (onIncidenciaAdded) onIncidenciaAdded();
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
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  // ✅ La validación de token se hace en el return
  if (!token) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-md p-8 shadow-lg w-[350px] md:w-[600px] max-w-lg animate-modal">
          <p className="text-red-500 text-center">No tienes acceso. Inicia sesión.</p>
          <button
            onClick={onClose}
            className="bg-[#FF5353] cursor-pointer w-full text-white rounded-md py-2 mt-2">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-md p-8 shadow-lg w-[350px] md:w-[600px] max-w-lg animate-modal">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-[#6a62dc] text-3xl flex justify-center w-full my-5">Nueva alerta</p>

          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={alerta.titulo}
            onChange={handleChange}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-3 text-black placeholder:text-[#6a62dc]"
            required
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={alerta.descripcion}
            onChange={handleChange}
            className="w-full h-[100px] min-h-[40px] max-h-[200px] bg-[#eff3fe] rounded-[5px] p-3 text-black placeholder:text-[#6a62dc]"
            required
          />

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

          <select
            name="tipo_destinatario"
            value={alerta.tipo_destinatario}
            onChange={handleChange}
            className="w-full text-[#6a62dc] h-[40px] bg-[#eff3fe] rounded-[5px] px-3 placeholder:text-[#6a62dc]">
            <option value="todos">Todos</option>
            <option value="operadores">Operadores</option>
            <option value="conductores">Conductores</option>
            <option value="conductores_ruta">Conductores de una ruta</option>
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

          {alerta.tipo_destinatario === 'conductores_ruta' && (
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

          <button
            type="submit"
            className="bg-[#6a62dc] cursor-pointer text-white rounded-md py-2 mt-2">
            Registrar
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
