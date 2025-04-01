import React, { useState, useEffect } from "react";

function ChoferesDisponiblesCard() {
  const [choferesDisponibles, setChoferesDisponibles] = useState(0);
  // Simulación de API
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchChoferesDisponibles = async () => {
      try {
        // Simulación de datos de choferes disponibles
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                json: () => ({ choferes: Array(8).fill({}) }), // Simulación con 8 choferes disponibles
              }),
            500
          )
        );
        const data = await response.json();
        if (data.choferes) {
          setChoferesDisponibles(data.choferes.length);
        }
      } catch (error) {
        console.error("Error fetching choferes disponibles:", error);
      }
    };

    fetchChoferesDisponibles();
  }, [API_LINK]);

  return (
    <div className="w-full bg-[#d4f8d4] shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[28px] font-bold text-[#28a745] font-['Inter']">
          Choferes Disponibles
        </h3>
        <span className="text-gray-600 text-xs">
          Total: {choferesDisponibles}
        </span>
      </div>
      {choferesDisponibles === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs">
            No hay choferes disponibles.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default ChoferesDisponiblesCard;
