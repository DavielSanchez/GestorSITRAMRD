import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import TablaAutobuses from "../components/PanelBuses/TablaBus";
import RegistrarBuses from "../components/PanelBuses/RegistrarBus";
import { useBG, useBGForButtons, useText } from "../ColorClass";
import { RoutesProvider } from "../components/RoutesContext";

function RegistroBuses() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const theme = token ? JSON.parse(atob(token.split(".")[1])).theme : "light";
  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};
  const handleButtonClick = (name) => setActiveButton(name);

  return (
    <div className={`flex h-screen overflow-hidden ${bgColor}`}>
      <Sidebar
        handleButtonClick={handleButtonClick}
        role="administrador"
        activeButton={activeButton}
      />
      <div className="flex flex-col flex-1 overflow-auto ml-[120px]">
        <TopBar title="Panel de Rutas Administrador" />
        <main className="flex-1 p-4 md:p-8 mt-[122px] transition-all duration-300">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"></section>
          <button
            onClick={() => setShowModal(true)}
            className={`${buttonColor} text-white font-semibold px-4 py-2 rounded-md w-48 hover:opacity-90 transition-colors`}
          >
            Registrar Buses
          </button>
          <TablaAutobuses/>
        </main>
      </div>
      <RoutesProvider>
        <RegistrarBuses
          isOpen={showModal}
          onClose={()=> setShowModal(false)}
          onBusesAdded={refreshTable}
        />
      </RoutesProvider>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#6A62DC] flex justify-around py-3 px-4 rounded-t-lg z-20"></div>
    </div>
  );
}

export default RegistroBuses;
