import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar/TopBar';
import IncidenciasCard from '../components/PanelOperador/IncidenciasCard';
import IncidenciasP from '../components/PanelIncidencias/IncidenciasP';
import IncidenciasR from '../components/PanelIncidencias/IncidenciasR';
// import Tabla from "../components/PanelIncidencias/Tabla";
import ModalRegistrar from '../components/PanelIncidencias/ModalRegistrar';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import EnhancedTable from '/src/components/Table.jsx';
import { jwtDecode } from 'jwt-decode';

export default function Incidencias() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRol = decodedToken.userRol;
  const theme = 'light';
  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};
  const handleButtonClick = (name) => setActiveButton(name);

  return (
    <div className={`flex  ${bgColor}`}>
      <div className="flex flex-col flex-1 overflow-auto">
        <main className="flex-1 p-4 md:p-8 transition-all duration-300">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* <IncidenciasCard /> */}
            <IncidenciasP />
            <IncidenciasP />
            <IncidenciasR />
          </section>
          {
            userRol === 'Conductor' ? <button
            onClick={() => setShowModal(true)}
            className={`${buttonColor} text-white font-semibold mb-6 px-4 py-2 rounded-md w-48 hover:opacity-90 transition-colors`}>
            Registrar incidencia
          </button> : null
          }
          {/* <Tabla /> */}
          <EnhancedTable />
        </main>
      </div>
      <ModalRegistrar
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onIncidenciaAdded={refreshTable}
      />
    </div>
  );
}
