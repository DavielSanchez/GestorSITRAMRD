import { useState, useEffect } from "react";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

export function BusesTotal() {
  const [buses, setBuses] = useState([]);

  // Endpoint de la API
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_LINK}/autobus/all`);
      const data = await res.json();
      setBuses(data)
    } catch (error) {
      console.log(`Error al obtener los autobuses: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [API_LINK]);

  return (
    <div className="bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex flex-row items-center gap-3">
      <DirectionsBusIcon/>
      <div className="text-[#6a62dc] text-xl font-bold">
        Buses Totales: {buses.length}
      </div>
    </div>
  );
}
