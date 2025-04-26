import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useBG, usePrimaryColors } from '../../ColorClass';

function EditarOperador({ isOpen, onClose, users, onUserUpdated, API_LINK }) {
  const [nombre, setNombre] = useState(users?.nombre || '');
  const [userRol, setUserRol] = useState(users?.userRol || '');
  const [estado, setEstado] = useState(users?.estadoUsuario || '');

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = usePrimaryColors(theme);
  const bgColor = useBG(theme);

  useEffect(() => {
    if (users) {
      setNombre(users.nombre);
      setUserRol(users.userRol);
      setEstado(users.estadoUsuario);
    }
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = users?._id || users?.id;

    try {
      const response = await fetch(`${API_LINK}/auth/users/put/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          userRol,
          estadoUsuario: estado,
        }),
      });

      if (response.ok) {
        if (onUserUpdated) onUserUpdated();
        onClose();
      } else {
        console.error('Error al actualizar el usuario');
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
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}
          />
           <select
            value={userRol}
            onChange={(e) => setUserRol(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}>
            <option value="">Selecciona un estado</option>
            <option value="Conductor">Conductor</option>
            <option value="Administrador">Administrador</option>
            <option value="Operador">Operador</option>
          </select>
          {/* Dropdown para estado */}
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className={`w-full h-12 bg-[#eff3fe] rounded-[5px] p-2 font-semibold text-[#6a62dc]`}>
            <option value="">Selecciona un estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

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

export default EditarOperador;
