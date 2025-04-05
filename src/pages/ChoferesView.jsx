import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import TopBar from '../components/TopBar';
import TotalChoferesCard from '../components/PanelChoferes/TotalChoferesCard';
import ChoferesEnRutaCard from '../components/PanelChoferes/ChoferesRutasCard';
import ChoferesDisponiblesCard from '../components/PanelChoferes/ChoferesDispCard';
import ChoferesDisponiblesTable from '../components/PanelChoferes/Tabla';
import ModalRegistrar from '../components/PanelIncidencias/ModalRegistrar';
import MenuIcon from '@mui/icons-material/Menu'; // Icono de menú
import IncidenciasP from '../components/PanelIncidencias/IncidenciasP';
import IncidenciasR from '../components/PanelIncidencias/IncidenciasR';
import EnhancedTable from '../components/Table';

function ChoferesView() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del Sidebar en móviles

  const token = localStorage.getItem('token');
  const theme = token ? JSON.parse(atob(token.split('.')[1])).theme : 'light';

  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};
  const handleButtonClick = (name) => {
    setActiveButton(name);
    setIsSidebarOpen(false); // Cerrar Sidebar en móviles al seleccionar una opción
  };

  return (
    <>
      <main className="flex-1 p-4 md:p-8 transition-all duration-300">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* <IncidenciasCard /> */}
          <IncidenciasP />
          <IncidenciasP />
          <IncidenciasR />
        </section>
        <section>
          <button
            onClick={() => setShowModal(true)}
            className={`${buttonColor} text-white font-semibold px-3 md:px-4 py-2 rounded-md w-full md:w-48 hover:opacity-90 transition-colors mb-4 md:mb-5`}>
            Registrar incidencia
          </button>

          <EnhancedTable />
        </section>
      </main>
      <ModalRegistrar
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onIncidenciaAdded={refreshTable}
      />
    </>
  );
}

export default ChoferesView;
