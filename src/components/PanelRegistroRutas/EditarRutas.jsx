import React, { useState, useEffect } from "react";

const EditarRuta = ({ isOpen, onClose, ruta, onRutaUpdated, API_LINK }) => {
  const [nombre, setNombre] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  useEffect(() => {
    if (ruta) {
      setNombre(ruta.nombre || "");
      setOrigen(ruta.origen || "");
      setDestino(ruta.destino || "");
    }
  }, [ruta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_LINK}/rutas/${ruta._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, origen, destino }),
      });

      if (response.ok) {
        onRutaUpdated(ruta._id, { nombre, origen, destino });
        onClose();
      } else {
        alert("Error al actualizar la ruta");
      }
    } catch (error) {
      console.error("Error en la petición PUT:", error);
      alert("Error en la petición");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-100 opacity-70"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded p-6 w-80 shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-[#6a62dc]">Editar Ruta</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-[#6a62dc] font-medium">
            Nombre:
          </label>
          <input
            type="text"
            className="w-full p-2 border border-[#6a62dc] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#6a62dc]"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label className="block mb-2 text-[#6a62dc] font-medium">
            Origen:
          </label>
          <input
            type="text"
            className="w-full p-2 border border-[#6a62dc] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#6a62dc]"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            required
          />

          <label className="block mb-2 text-[#6a62dc] font-medium">
            Destino:
          </label>
          <input
            type="text"
            className="w-full p-2 border border-[#6a62dc] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#6a62dc]"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-[#6a62dc] text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarRuta;
