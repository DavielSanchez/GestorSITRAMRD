import { useState, useEffect } from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { jwtDecode } from 'jwt-decode';
import {usePrimaryColors} from '../../ColorClass'

export function OperadorInactivo() {
  const [User, SetUser] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;

  // Endpoint de la API
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';
  const FetchData = async () => {
    try {
      const res = await fetch(`${API_LINK}/auth/users`);
      const data = await res.json();

      const Usuarios = data.filter((user) => user.estadoUsuario === 'inactivo' && user.userRol === 'Operador').length;
      SetUser(Usuarios);
    } catch (error) {
      console.error(`Error al encontrar la incidencia: ${error}`);
    }
  };

  useEffect(() => {
    FetchData();
  }, [API_LINK]);

  return (
    <div className={`bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex flex-row items-center gap-3`}>
      <DirectionsBusIcon />
      <div className={`text-[#6a62dc] text-xl font-bold`}>Operadores Inactivos: {User}</div>
    </div>
  );
}
