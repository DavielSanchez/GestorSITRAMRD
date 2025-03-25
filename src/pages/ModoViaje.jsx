import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useBG,useBGForButtons , useText, usePrimaryColors, useColorsWithHover, useIconColor } from "../ColorClass";

import TopBar from "../components/TopBar";

function ModoViaje() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");

  const token = localStorage.getItem("token");
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";

  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const handleButtonClick = (name) => {
    setActiveButton(name);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
      {/* Sidebar fijo */}
      <Sidebar
        role="chofer"
        handleButtonClick={handleButtonClick}
        activeButton={activeButton}
      />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px] relative">
        {/* Barra Superior fija */}
        <div
          className={`fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] ${bgColor} shadow flex justify-between items-center px-[68px] py-4 z-50`}
        >
          <TopBar title="Modo Viaje" />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-8 mt-[140px] flex flex-col items-center">
          {/* Título centrado */}
          <h1 className="text-[#6a62dc] text-[64px] font-semibold font-['Inter'] text-center">
            Validación de boletos
          </h1>

          {/* Contenedor del escáner */}
          <div className="w-[692px] h-[424px] bg-[#f1f1ff] rounded-2xl flex flex-col items-center justify-center mt-8 mb-6">
            <img
              className="w-[236px] h-[237px]"
              src="https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024-1.jpg"
              alt="Escáner"
            />
          </div>

          {/* Botón de escaneo */}
          <button
            className="px-6 py-3 bg-[#6a62dc] text-white text-xl font-medium rounded-lg shadow-md hover:bg-[#5548c2] transition-all"
          >
            Escanea tu código QR
          </button>
        </main>
      </div>

      {/* Navegación inferior para móviles */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 ${buttonColor} flex justify-around py-3 px-4 rounded-t-lg z-20`}
      >
        {/* Opciones móviles */}
      </div>
    </div>
  );
}

export default ModoViaje;
