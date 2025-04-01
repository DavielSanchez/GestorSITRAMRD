import React, { useState } from "react";

function ModalRegistrar({ isOpen, onClose, onRutaAdded }) {
  const [nombreRuta, setNombreRuta] = useState("");
  const [coordenadas, setCoordenadas] = useState("");
  const [paradas, setParadas] = useState("");
  const [tarifa, setTarifa] = useState("");

  // Endpoint de la API
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreRuta,
          coordenadas: JSON.parse(coordenadas),
          paradas: JSON.parse(paradas),
          Tarifa: parseFloat(tarifa),
        }),
      });

      if (response.ok) {
        if (onRutaAdded) onRutaAdded();

        setNombreRuta("");
        setCoordenadas("");
        setParadas("");
        setTarifa("");

        
        onClose();
      } else {
        console.error("Error al registrar la ruta");
      }
    } catch (error) {
      console.error("Error en la peticiÃ³n:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      <div className="bg-white rounded-md p-8 shadow-lg min-w-[400px] max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de la Ruta"
            value={nombreRuta}
            onChange={(e) => setNombreRuta(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <textarea
            placeholder="Coordenadas"
            value={coordenadas}
            onChange={(e) => setCoordenadas(e.target.value)}
            className="w-full h-[100px] bg-[#eff3fe] rounded-[5px] p-2 text-black"
          />
          <textarea
            placeholder="Paradas"
            value={paradas}
            onChange={(e) => setParadas(e.target.value)}
            className="w-full h-[100px] bg-[#eff3fe] rounded-[5px] p-2 text-black"
          />
          <input
            type="number"
            placeholder="Tarifa"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
            Registrar
          </button>
        </form>
        <button onClick={onClose} className="mt-2 text-sm text-gray-500 hover:underline">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ModalRegistrar;