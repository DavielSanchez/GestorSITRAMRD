import React from "react";
import UsuariosActivosCard from "../components/PanelAdministrador/UsuariosActivosCard";
import { IncidenciasCard, ReportesCard } from "../components/PanelAdministrador/IncidenciasCard";
import AutobusesCard from "../components/PanelAdministrador/AutobusesCard";
import { RutasCard, ParadasCard } from "../components/PanelAdministrador/RutasYParadasCard";
import Mapa from "../components/PanelAdministrador/Mapa";

function PanelAdministrador() {
  return (
    <>
    <title>HOME | ADMIN</title>
    <main className="flex-1 p-4 md:p-8 transition-all duration-300">

    
<section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <UsuariosActivosCard />
              <IncidenciasCard />
              <ReportesCard />
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
    </>
  );
}

export default PanelAdministrador;