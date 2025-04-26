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

  function RutasIcon() {
    return (

      <div data-svg-wrapper>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="31" fill="#6A62DC" className="bi bi-sign-turn-right-fill" viewBox="0 0 16 16">
  <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM9 8.466V7H7.5A1.5 1.5 0 0 0 6 8.5V11H5V8.5A2.5 2.5 0 0 1 7.5 6H9V4.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L9.41 8.658A.25.25 0 0 1 9 8.466"/>
</svg>
      </div>

    );
  }

  return (
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg px-4 py-3 flex flex-row items-center gap-3">
    <div className="flex-shrink-0">
      <RutasIcon />
    </div>
    <div className="flex flex-col">
      <span className="text-[#6A62DC] font-bold text-xl">
      Rutas Activas:
      </span>
      <span className="text-red-500 text-2xl font-bold">
      {loadingRutas ? "..." : totalRutas}
      </span>
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

  function RutasIcon() {
    return (
      <div data-svg-wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="31" fill="#6A62DC" className="bi bi-cone-striped" viewBox="0 0 16 16">
  <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9s-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12m-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4s1.2-.036 1.725-.098m4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257z"/>
</svg>
</div>
    );
  }

  return (
    
    <div className="w-full bg-[#f1f1ff] shadow-md rounded-lg px-4 py-3 flex flex-row items-center gap-3">
    <div className="flex-shrink-0">
      <RutasIcon />
    </div>
    <div className="flex flex-col">
      <span className="text-[#6A62DC] font-bold text-xl">
      Paradas Registradas:
      </span>
      <span className="text-red-500 text-2xl font-bold">
      {loadingParadas ? "..." : totalParadas}
      </span>
    </div>
  </div>
  );
}
