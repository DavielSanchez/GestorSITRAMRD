import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useBG, useBGForButtons, useText } from "../ColorClass";
import TopBar from "../components/TopBar";
import MenuIcon from "@mui/icons-material/Menu"; // Icono de menú para el sidebar en móviles

function ModoViaje() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del Sidebar en móviles

  const token = localStorage.getItem("token");
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";

  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const handleButtonClick = (name) => {
    setActiveButton(name);
    setIsSidebarOpen(false); // Cerrar Sidebar en móviles al seleccionar una opción
  };

  return (
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
      {/* Botón de menú en móviles */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-200 p-2 rounded-md shadow"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Fondo oscuro al abrir el Sidebar en móviles */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[240px] bg-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[120px] z-50`}
      >
        <Sidebar role="chofer" handleButtonClick={handleButtonClick} activeButton={activeButton} />
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-auto transition-all duration-300 md:ml-[120px]">
        {/* Barra Superior */}
        <div
          className={`fixed top-0 left-0 md:left-[120px] w-full md:w-[calc(100%-120px)] h-[70px] md:h-[122px] ${bgColor} shadow flex justify-between items-center px-4 md:px-[68px] py-2 md:py-4 z-50`}
        >
          <TopBar title="Modo Viaje" />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-8 mt-[70px] md:mt-[122px] flex flex-col items-center">
          {/* Título centrado */}
          <h1 className="text-[#6a62dc] text-2xl md:text-[64px] font-semibold font-['Inter'] text-center">
            Validación de boletos
          </h1>

          {/* Contenedor del escáner */}
          <div className="w-full max-w-xs md:max-w-lg bg-[#f1f1ff] rounded-2xl flex flex-col items-center justify-center mt-6 md:mt-8 mb-4 md:mb-6 p-6">
            <img
              className="w-40 md:w-[236px] h-40 md:h-[237px]"
              src="https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024-1.jpg"
              alt="Escáner"
            />
          </div>

          {/* Botón de escaneo */}
          <button
            className="w-full md:w-auto px-6 py-3 bg-[#6a62dc] text-white text-lg md:text-xl font-medium rounded-lg shadow-md hover:bg-[#5548c2] transition-all"
          >
            Escanea tu código QR
          </button>
        </main>
      </div>

      {/* Navegación inferior en móviles */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${buttonColor} flex justify-around py-3 px-4 rounded-t-lg z-20`}>
        {/* Opciones móviles (puedes agregar iconos o botones aquí) */}
      </div>
    </div>
  );
}

export default ModoViaje;
