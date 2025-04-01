import React, { useState, useEffect } from "react";

function TotalChoferesCard() {
  const [totalChoferes, setTotalChoferes] = useState(0);
  // Simulación de API
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchChoferes = async () => {
      try {
        // Simulación de datos de choferes
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({ json: () => ({ choferes: Array(10).fill({}) }) }), 500)
        );
        const data = await response.json();
        if (data.choferes) {
          setTotalChoferes(data.choferes.length);
        }
      } catch (error) {
        console.error("Error fetching choferes:", error);
      }
    };

    fetchChoferes();
  }, [API_LINK]);

  return (
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[28px] font-bold text-[#6A62DC] font-['Inter']">
          Total Choferes
        </h3>
        <span className="text-gray-600 text-xs">
          Total: {totalChoferes}
        </span>
      </div>
      {totalChoferes === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-xs">
            No hay choferes registrados.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default TotalChoferesCard;
