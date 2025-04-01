import React, { useState, useEffect } from "react";

function ChoferesEnRutaCard() {
  const [choferesEnRuta, setChoferesEnRuta] = useState(0);
  // Simulación de API
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchChoferesEnRuta = async () => {
      try {
        // Simulación de datos de choferes en ruta
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                json: () => ({ choferes: Array(5).fill({}) }), // Simulación con 5 choferes en ruta
              }),
            500
          )
        );
        const data = await response.json();
        if (data.choferes) {
          setChoferesEnRuta(data.choferes.length);
        }
      } catch (error) {
        console.error("Error fetching choferes en ruta:", error);
      }
    };

    fetchChoferesEnRuta();
  }, [API_LINK]);

  return (
    <div className="w-full bg-[#e8f7ff] shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[28px] font-bold text-[#007bff] font-['Inter']">
          Choferes en Ruta
        </h3>
        <span className="text-gray-600 text-xs">
          Total: {choferesEnRuta}
        </span>
      </div>
      {choferesEnRuta === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs">
            No hay choferes en ruta.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default ChoferesEnRutaCard;
