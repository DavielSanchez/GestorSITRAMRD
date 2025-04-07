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

  return (
    <div className="w-[98%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">

      <div className="text-xl font-bold">
        Incidencias Reportadas: {loading ? "..." : incidencias}
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

  return (
    <div className="w-[98%] bg-[#f1f1ff] text-[#6a62dc] shadow-md rounded-lg p-4 flex items-center gap-3">

      <div className="text-xl font-bold">
        Reportes Completados: {loading ? "..." : reportes}
      </div>
    </div>
  );
}
