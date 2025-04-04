import React, { useState, useEffect } from "react";

function EditarBus({ isOpen, onClose, autobus, onAutobusUpdated, API_LINK }) {
  const [placa, setPlaca] = useState(autobus?.placa || "");
  const [modelo, setModelo] = useState(autobus?.modelo || "");
  const [capacidad, setCapacidad] = useState(autobus?.capacidad || "");
  const [estado, setEstado] = useState(autobus?.estado || "");
  const [idRuta, setIdRuta] = useState(autobus?.idRuta || "");

  useEffect(() => {
    if (autobus) {
      setPlaca(autobus.placa);
      setModelo(autobus.modelo);
      setCapacidad(autobus.capacidad);
      setEstado(autobus.estado);
      setIdRuta(autobus.idRuta || "");
    }
  }, [autobus]);

  // const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_LINK}/autobus/update/${autobus._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placa,
          modelo,
          capacidad: parseInt(capacidad),
          estado,
          idRuta: idRuta || null,
        }),
      });

      if (response.ok) {
        if (onAutobusUpdated) onAutobusUpdated();
        onClose();
      } else {
        console.error("Error al actualizar el autobús");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
    };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
      <div className="bg-white rounded-md p-8 shadow-lg min-w-[400px] max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <input
            type="number"
            placeholder="Capacidad"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <input
            type="text"
            placeholder="ID Ruta (Opcional)"
            value={idRuta}
            onChange={(e) => setIdRuta(e.target.value)}
            className="w-full h-[40px] bg-[#eff3fe] rounded-[5px] px-2 text-black"
          />
          <button type="submit" className="bg-[#6a62dc] text-white rounded-md py-2 mt-2">
            Guardar Cambios
          </button>
        </form>
        <button onClick={onClose} className="mt-2 text-sm text-gray-500 hover:underline">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default EditarBus;
