import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { useBG, useBGForButtons, useText } from "../ColorClass";

function RegistrarRuta() {
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
      <Sidebar role="operador" handleButtonClick={handleButtonClick} activeButton={activeButton} />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto ml-[120px] relative">
        {/* Barra Superior fija con los mismos márgenes y dimensiones */}
        <div className={`fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] ${bgColor} shadow flex justify-between items-center px-[68px] py-4 z-50`}>
          <TopBar title="Vista rutas registradas" />
        </div>

      </div>

      {/* Navegación inferior para móviles (opcional) */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${buttonColor} flex justify-around py-3 px-4 rounded-t-lg z-20`}>
        {/* Opciones móviles */}
      </div>
    </div>
  );
}

export default RegistrarRuta;
