import React from "react";
import UsuariosActivosCard from "../components/PanelAdministrador/UsuariosActivosCard";
import { IncidenciasCard, ReportesCard } from "../components/PanelAdministrador/IncidenciasCard";
import AutobusesCard from "../components/PanelAdministrador/AutobusesCard";
import { RutasCard, ParadasCard } from "../components/PanelAdministrador/RutasYParadasCard";
import Mapa from "../components/PanelAdministrador/Mapa";

function PanelAdministrador() {
  return (
    <main className="flex-1 p-4 md:p-8 transition-all duration-300">

    
      <section className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="md:col-span-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            <div className="w-full sm:w-1/3">
              <UsuariosActivosCard />
            </div>
            <div className="w-full sm:w-1/3">
              <IncidenciasCard />
            </div>
            <div className="w-full sm:w-1/3">
              <ReportesCard />
            </div>
          </div>
        </div>
      </section>

    
      <section className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
        <div className="md:col-span-4 h-full">
          <Mapa />
        </div>

        <div className="md:col-span-2 flex flex-col gap-4 h-full">
          <RutasCard />
          <AutobusesCard />
          <ParadasCard />
        </div>
      </section>
    </main>
  );
}

export default PanelAdministrador;