import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useBG, useBGForButtons, useText } from "../ColorClass";
import TopBar from "../components/TopBar";
import TotalChoferesCard from "../components/PanelChoferes/TotalChoferesCard";
import ChoferesEnRutaCard from "../components/PanelChoferes/ChoferesRutasCard";
import ChoferesDisponiblesCard from "../components/PanelChoferes/ChoferesDispCard";
import ChoferesDisponiblesTable from "../components/PanelChoferes/Tabla";
import ModalRegistrar from "../components/PanelIncidencias/ModalRegistrar";
import MenuIcon from "@mui/icons-material/Menu"; // Icono de menú

function ChoferesView() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del Sidebar en móviles

  const token = localStorage.getItem("token");
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";

  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};
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
          <TopBar title="Dashboard" />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 p-2 md:p-8 mt-[70px] md:mt-[122px] transition-all duration-300">
          {/* Sección de tarjetas */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
            <TotalChoferesCard />
            <ChoferesEnRutaCard />
            <ChoferesDisponiblesCard />
          </section>

          {/* Botón "Registrar incidencia" y tabla */}
          <section>
            <button
              onClick={() => setShowModal(true)}
              className={`${buttonColor} text-white font-semibold px-3 md:px-4 py-2 rounded-md w-full md:w-48 hover:opacity-90 transition-colors mb-4 md:mb-5`}
            >
              Registrar incidencia
            </button>

            <ChoferesDisponiblesTable />
          </section>
        </main>

        {/* Modal para registrar incidencia */}
        <ModalRegistrar isOpen={showModal} onClose={() => setShowModal(false)} onIncidenciaAdded={refreshTable} />
      </div>

      {/* Navegación inferior en móviles */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${buttonColor} flex justify-around py-3 px-4 rounded-t-lg z-20`}>
        {/* Opciones móviles (puedes agregar iconos o botones aquí) */}
      </div>
    </div>
  );
}

export default ChoferesView;
