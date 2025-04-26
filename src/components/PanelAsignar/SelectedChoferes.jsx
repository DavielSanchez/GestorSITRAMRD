import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";

const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

function SelectedChoferes({ selectedChoferes, setSelectedChoferes}) {

  const token = localStorage.getItem("token");
      let userId = null;
      let theme = 'light'
      try {
          if (token) {
              const decodedToken = jwtDecode(token);
              userId = decodedToken?.id;
              theme = decodedToken?.theme;
          }
      } catch (error) {
          console.error("Error al decodificar el token:", error);
      }

  const [choferes, setChoferes] = useState([]);

  useEffect(() => {
    const fetchChoferes = async () => {
      try {
        const response = await fetch(`${API_LINK}/autobus/choferes/all`);
        if (!response.ok) {
          console.error('Error al obtener las choferes:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log(data)
        setChoferes(data);
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    };

    fetchChoferes();
  }, []);

  return (
    <div className=" h-[60px] bg-[#eff3fe] rounded-[5px] relative flex items-center px-4">
      <select
        className="
          appearance-none
          w-full
          h-full
          text-[#211f47]
          text-xl
          font-semibold
          bg-transparent
          px-4
          focus:outline-none
          cursor-pointer
        "
        value={selectedChoferes}
        onChange={(e) => setSelectedChoferes(e.target.value)}>
        <option value="">Seleccione un chofer</option>
        {choferes.map((chofer) => (
          <option key={chofer._id} value={chofer._id}>
            {chofer.nombre ? chofer.nombre : `AutoBus ${chofer._id}`}
          </option>
        ))}
      </select>
      {/* Ícono de triángulo para el selector */}
      <div
        data-svg-wrapper
        className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="
            w-0
            h-0
            border-l-[11px]
            border-l-transparent
            border-r-[11px]
            border-r-transparent
            border-t-[19.33px]
            border-t-[#6a62dc]
          "
        />
      </div>
    </div>
  );
}

export default SelectedChoferes;
