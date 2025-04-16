import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import IncidenciasCard from "../components/PanelOperador/IncidenciasCard";
import ReporteCard from "../components/PanelOperador/ReporteCard";
import AutobusACard from "../components/PanelOperador/AutobusACard";
import Mapa from "../components/PanelOperador/Mapa";
import Rutas from "../components/PanelOperador/Rutas";
import AutobusesCardCounter from "../components/PanelOperador/AutobusesCard";
import IncidenciasP from "../components/PanelIncidencias/IncidenciasP";
import MisIncidenciasPendientes from "../components/PanelIncidencias/misIncidenciasPendientes";
import MisIncidenciasProceso from "../components/PanelIncidencias/MisIncidenciasProceso";
import AutobusesNoAsignados from "../components/PanelIncidencias/AutobusesNoAsignados";

export default function PanelOperador() {
  return (
    <main className="flex-1 justify-center p-4 md:p-8 transition-all duration-300">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* <IncidenciasCard />
        <ReporteCard />
        <AutobusACard /> */}
        <MisIncidenciasPendientes/>
        <MisIncidenciasProceso/>
        <AutobusesNoAsignados/>
      </section>

      {/* Sección del mapa y contadores separados */}
      <section className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
        <Mapa />
        <div className="md:col-span-2 grid grid-cols-1 gap-5">
          <Rutas />
          <AutobusesCardCounter />
        </div>
      </section>
    </main>
  );
}
