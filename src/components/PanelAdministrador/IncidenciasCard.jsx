import React, { useEffect, useState } from "react";

export function IncidenciasCard() {
  const [incidencias, setIncidencias] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/incidencia/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setIncidencias(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Error fetching incidencias:", error);
        setIncidencias(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidencias();
  }, []);
  const BusIcon = () => (
    <div data-svg-wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="31" fill="currentColor" className="bi bi-flag-fill" viewBox="0 0 16 16">
  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
</svg>
    </div>
  );

  return (
    <div className="w-[98%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">
      <BusIcon />
      <div className="text-xl font-bold">
        Incidencias Reportadas: ({loading ? "..." : incidencias})
      </div>
    </div>
  );
}

export function ReportesCard() {
  const [reportes, setReportes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/incidencia/all`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setReportes(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Error fetching reportes:", error);
        setReportes(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidencias();
  }, []);

  const BusIcon = () => (
    <div data-svg-wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="31" fill="currentColor" className="bi bi-clipboard-data-fill" viewBox="0 0 16 16">
  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"/>
</svg>
    </div>
  );

  return (
    <div className="w-[98%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">
      <BusIcon />
      <div className="text-xl font-bold">
        Reportes Completados: ({loading ? "..." : reportes})
      </div>
    </div>
  );
}
