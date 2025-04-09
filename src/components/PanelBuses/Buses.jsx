import { useState, useEffect } from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { jwtDecode } from 'jwt-decode';
import {usePrimaryColors} from '../../ColorClass'

export function BusesTotal() {
  const [buses, setBuses] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const theme = decodedToken.theme;
  const textColor = usePrimaryColors(theme);

  // Endpoint de la API
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_LINK}/autobus/all`);
      const data = await res.json();
      setBuses(data);
    } catch (error) {
      console.log(`Error al obtener los autobuses: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [API_LINK]);

  return (
    <div className={`bg-[#f1f1ff] ${textColor} shadow-md rounded-lg p-4 flex flex-row items-center gap-3`}>
      <DirectionsBusIcon />
      <div className={`${textColor} text-xl font-bold`}>Buses Totales: {buses.length}</div>
    </div>
  );
}
