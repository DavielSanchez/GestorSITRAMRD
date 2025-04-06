import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablaRuta from '../components/PanelRutas/TablaRuta';
import RegistrarRutas from '../components/PanelRutas/RegistrarRutas';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import { RoutesProvider } from '../components/RoutesContext';
import { BusesInactivos } from '../components/PanelBuses/BusInactivos';
import Rutas from '../components/PanelOperador/Rutas';

function RegistroRuta() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const theme = token ? JSON.parse(atob(token.split('.')[1])).theme : 'light';
  const bgColor = useBG(theme);
  const buttonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  const refreshTable = () => {};

  return (
    <main className="flex-1 p-4 md:p-8 transition-all duration-300">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Rutas />
      </section>
      <button
        onClick={() => setShowModal(true)}
        className={`${buttonColor} text-white font-semibold px-4 py-2 mb-5 rounded-md w-48 hover:opacity-90 transition-colors`}>
        Registrar Rutas
      </button>
      <TablaRuta />
      <RoutesProvider>
        <RegistrarRutas
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onBusesAdded={refreshTable}
        />
      </RoutesProvider>
    </main>
  );
}

export default RegistroRuta;
