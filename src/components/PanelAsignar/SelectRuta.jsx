import React, { useState, useEffect } from "react";
import { useBG, useText, useIconColor } from "../../ColorClass";

const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";

function SelectRuta({ theme }) {
  const [rutas, setRutas] = useState([]);
  const [selectedRuta, setSelectedRuta] = useState("");

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch(`${API_LINK}/ruta/all`);
        if (!response.ok) {
          console.error("Error al obtener las rutas:", response.statusText);
          return;
        }
        const data = await response.json();
        setRutas(data);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      }
    };

    fetchRutas();
  }, []);

  const handleChange = (event) => {
    setSelectedRuta(event.target.value);
  };

  return (
    <div className={`w-[477px] h-[89px] bg-[#eff3fe] rounded-[5px] relative flex items-center px-4`}>
        <select
          className={`
          appearance-none
          w-full
          h-full
          text-[#211f47]
          text-2xl
          font-semibold
          font-['Inter']
          bg-transparent
          px-4
          focus:outline-none
          cursor-pointer`}
          value={selectedRuta}
          onChange={handleChange}
        >
          <option value="">Seleccione una ruta</option>
          {rutas.map((ruta) => (
            <option key={ruta._id} value={ruta._id}>
              {ruta.nombreRuta ? ruta.nombreRuta : `Ruta ${ruta._id}`}
            </option>
          ))}
        </select>
        {/* Ícono de triángulo para el selector */}
        <div
        data-svg-wrapper
        className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div
          className="
            w-0
            h-0
            border-l-[11px]
            border-l-transparent
            border-r-[11px]
            border-r-transparent
            border-t-[19.33px]
            border-t-[#6a62dc]
          "
        />
      </div>
    </div>
    
  );
}

export default SelectRuta;

{/* <div className={`w-[477px] h-[89px] ${useBG(theme)} rounded-[5px] flex flex-col justify-center px-4 relative`}>
      <label className={`text-2xl font-semibold font-['Inter'] mb-2 ${useText(theme)}`}>
        Seleccione una ruta
      </label>
      <div className="relative">
        <select
          className={`w-full h-[40px] bg-white border border-gray-300 rounded-md px-2 ${useText(theme)}`}
          value={selectedRuta}
          onChange={handleChange}
        >
          <option value="">-- Seleccionar --</option>
          {rutas.map((ruta) => (
            <option key={ruta._id} value={ruta._id}>
              {ruta.nombreRuta ? ruta.nombreRuta : `Ruta ${ruta._id}`}
            </option>
          ))}
        </select>
        {/* Ícono de triángulo para el selector */}
    //     <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
    //       <svg
    //         width="16"
    //         height="16"
    //         viewBox="0 0 24 24"
    //         fill={useIconColor(theme, "chevron")}
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path d="M7 10l5 5 5-5H7z" />
    //       </svg>
    //     </div>
    //   </div>
    // </div> */}
