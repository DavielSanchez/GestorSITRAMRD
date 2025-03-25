import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  useBG,
  useBGForButtons,
  useText,
  usePrimaryColors,
  useColorsWithHover,
  useIconColor,
} from "../ColorClass";
import TopBar from "../components/TopBar";
import TotalChoferesCard from "../components/PanelChoferes/TotalChoferesCard";
import ChoferesEnRutaCard from "../components/PanelChoferes/ChoferesRutasCard";
import ChoferesDisponiblesCard from "../components/PanelChoferes/ChoferesDispCard";
import ChoferesDisponiblesTable from "../components/PanelChoferes/Tabla";
import ModalRegistrar from "../components/PanelIncidencias/ModalRegistrar";

function ChoferesView() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";

  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};
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
        {/* Barra Superior fija con los mismos márgenes y dimensiones */}
        <div
          className={`fixed top-0 left-[120px] w-[calc(100%-120px)] h-[122px] ${bgColor} shadow flex justify-between items-center px-[68px] py-4 z-50`}
        >
          <TopBar title="Dashboard" />
        </div>

        {/* Contenido principal: se le aplica mt-[122px] para que no quede tapado por la barra superior */}
        <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
          {/* Sección de tarjetas de estadísticas (cada card maneja su propia API) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <TotalChoferesCard></TotalChoferesCard>
            <ChoferesEnRutaCard></ChoferesEnRutaCard>
            <ChoferesDisponiblesCard></ChoferesDisponiblesCard>
          </section>

          {/* Sección del mapa y contadores separados */}
          <section>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className={`${buttonColor} text-white font-semibold px-4 py-2 rounded-md w-48 hover:opacity-90 transition-colors mb-5`}
              >
                Registrar incidencia
              </button>

              <ChoferesDisponiblesTable></ChoferesDisponiblesTable>
            </div>
          </section>
        </main>
        <ModalRegistrar
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onIncidenciaAdded={refreshTable}
        />
      </div>

      {/* Navegación inferior para móviles (opcional) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 ${buttonColor} flex justify-around py-3 px-4 rounded-t-lg z-20`}
      >
        {/* Opciones móviles */}
      </div>
    </div>
  );
}

export default ChoferesView;
