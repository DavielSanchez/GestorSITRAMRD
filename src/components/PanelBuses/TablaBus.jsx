import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ModalEditarBus from "./EditarBus";

function TablaAutobuses() {
  const [autobuses, setAutobuses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAutobus, setSelectedAutobus] = useState(null);
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

  useEffect(() => {
    const fetchAutobuses = async () => {
      try {
        const response = await fetch(`${API_LINK}/all`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setAutobuses(data);
        } else {
          console.error("Formato de datos inesperado:", data);
        }
      } catch (error) {
        console.error("Error al obtener los autobuses:", error);
      }
    };
    fetchAutobuses();
  }, [API_LINK]);

  const handleEditClick = (autobus) => {
    setSelectedAutobus(autobus);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAutobus(null);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-[#6a62dc] text-white">
            <th className="px-4 py-2 text-center">Placa</th>
            <th className="px-4 py-2 text-center">Modelo</th>
            <th className="px-4 py-2 text-center">Capacidad</th>
            <th className="px-4 py-2 text-center">Estado</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {autobuses.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                No hay autobuses registrados.
              </td>
            </tr>
          ) : (
            autobuses.map((autobus, index) => (
              <tr key={autobus._id} className="border-b">
                <td className="px-4 py-2 text-center text-[#6a62dc] font-semibold">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-center">{autobus.placa || "N/A"}</td>
                <td className="px-4 py-2 text-center">{autobus.modelo || "N/A"}</td>
                <td className="px-4 py-2 text-center">{autobus.capacidad || "N/A"}</td>
                <td className="px-4 py-2 text-center">{autobus.estado || "N/A"}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleEditClick(autobus)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M10.5 2.82861L14.5 6.82861M1 16.3284H5L15.5 5.82843C15.7626 5.56578 15.971 5.25398 16.1131 4.91082C16.2553 4.56766 16.3284 4.19986 16.3284 3.82843C16.3284 3.45699 16.2553 3.0892 16.1131 2.74604C15.971 2.40287 15.7626 2.09107 15.5 1.82843C15.2374 1.56578 14.9256 1.35744 14.5824 1.2153C14.2392 1.07316 13.8714 1 13.5 1C13.1286 1 12.7608 1.07316 12.4176 1.2153C12.0744 1.35744 11.7626 1.56578 11.5 1.82843L1 12.3284V16.3284Z"
                          stroke="#6A62DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedAutobus && (
        <ModalEditarBus
          isOpen={isModalOpen}
          onClose={handleModalClose}
          autobus={selectedAutobus}
          API_LINK={API_LINK}
        />
      )}
    </div>
  );
}

export default TablaAutobuses;
