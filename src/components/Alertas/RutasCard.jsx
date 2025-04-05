import React, { useState, useEffect } from 'react';

function RutasCard() {
  const [pendientes, setPendientes] = useState([]);
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  const fetchIncidencias = async () => {
    // try {
    //   const response = await fetch(`${API_LINK}/incidencia/all`);
    //   const data = await response.json();
    //   if (data.incidencias) {
    //     const pendientesIncidencias = data.incidencias.filter(
    //       (inc) =>
    //         inc.estado &&
    //         (inc.estado.toLowerCase() === 'pendiente' || inc.estado.toLowerCase() === 'en proceso'),
    //     );
    //     setPendientes(pendientesIncidencias);
    //   }
    // } catch (error) {
    //   console.error('Error fetching incidencias:', error);
    // }
  };

  // useEffect(() => {
  //   fetchIncidencias();
  //   const interval = setInterval(fetchIncidencias, 5000);
  //   return () => clearInterval(interval);
  // }, [API_LINK]);

  const BusIcon = () => (
    <div data-svg-wrapper>
      <svg
        width="42"
        height="31"
        viewBox="0 0 42 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.8 25.1429C5.8 26.1658 6.20036 27.1469 6.91299 27.8703C7.62563 28.5936 8.59218 29 9.6 29C10.6078 29 11.5744 28.5936 12.287 27.8703C12.9996 27.1469 13.4 26.1658 13.4 25.1429M5.8 25.1429C5.8 24.1199 6.20036 23.1388 6.91299 22.4154C7.62563 21.6921 8.59218 21.2857 9.6 21.2857C10.6078 21.2857 11.5744 21.6921 12.287 22.4154C12.9996 23.1388 13.4 24.1199 13.4 25.1429M5.8 25.1429H2V3.92857C2 3.41708 2.20018 2.92654 2.5565 2.56487C2.91282 2.20319 3.39609 2 3.9 2H30.5C33.0196 2 35.4359 3.42232 37.2175 5.95406C38.9991 8.4858 40 11.9196 40 15.5M13.4 25.1429H28.6M28.6 25.1429C28.6 26.1658 29.0004 27.1469 29.713 27.8703C30.4256 28.5936 31.3922 29 32.4 29C33.4078 29 34.3744 28.5936 35.087 27.8703C35.7996 27.1469 36.2 26.1658 36.2 25.1429M28.6 25.1429C28.6 24.1199 29.0004 23.1388 29.713 22.4154C30.4256 21.6921 31.3922 21.2857 32.4 21.2857C33.4078 21.2857 34.3744 21.6921 35.087 22.4154C35.7996 23.1388 36.2 24.1199 36.2 25.1429M36.2 25.1429H40V15.5M40 15.5H31.45L28.6 2M2 11.6429H30.5M11.5 2V11.6429M21 2V11.6429"
          stroke="#6A62DC"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
    <div className="bg-[#f1f1ff] shadow-md rounded-lg p-4 flex flex-row items-center gap-3">
      <BusIcon />
      <span className="text-[#6a62dc] text-xl font-bold">
        Alertas de Ruta ({pendientes.length})
      </span>
    </div>
  );
}

export default RutasCard;
