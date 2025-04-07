import React, { useEffect, useState } from "react";

export function RutasCard() {
  const [totalRutas, setTotalRutas] = useState(null);
  const [loadingRutas, setLoadingRutas] = useState(true);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/ruta/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setTotalRutas(data.length);
      } catch (error) {
        console.error("Error fetching rutas:", error);
        setTotalRutas(null);
      } finally {
        setLoadingRutas(false);
      }
    };

    fetchRutas();
  }, []);

  return (
<div className="w-[95%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">

      <div className="text-xl font-bold">
        Rutas Activas: {loadingRutas ? "..." : totalRutas}
      </div>
    </div>
  );
}

export function ParadasCard() {
  const [totalParadas, setTotalParadas] = useState(null);
  const [loadingParadas, setLoadingParadas] = useState(true);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/ruta/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const paradasCount = data.reduce((acc, ruta) => acc + (ruta.paradas?.length || 0), 0);
        setTotalParadas(paradasCount);
      } catch (error) {
        console.error("Error fetching paradas:", error);
        setTotalParadas(null);
      } finally {
        setLoadingParadas(false);
      }
    };

    fetchRutas();
  }, []);

  return (
    <div className="w-[95%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">

      <div className="text-xl font-bold">
        Paradas Registradas: {loadingParadas ? "..." : totalParadas}
      </div>
    </div>
  );
}
