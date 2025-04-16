import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablaChofer from '../components/PanelConductoresAdmin/TablaChofer';
import RegistrarChofer from '../components/PanelConductoresAdmin/RegistrarChofer';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import { RoutesProvider } from '../components/RoutesContext';
import { BusesInactivos } from '../components/PanelBuses/BusInactivos';
import { BusesTotal } from '../components/PanelBuses/Buses';
import { Choferes } from '../components/PanelConductoresAdmin/Choferes';
import { ChoferesInactivo } from '../components/PanelConductoresAdmin/conductoresInactivos';

function ChoferUser() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const theme = token ? JSON.parse(atob(token.split('.')[1])).theme : 'light';

  const refreshTable = () => {};

  return (
    <main className=" bg-white flex-1 p-4 md:p-8 transition-all duration-300">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Choferes />
        <ChoferesInactivo/>
      </section>

      <button
        onClick={() => setShowModal(true)}
        className={`bg-[#6a62dc] text-white font-semibold px-4 py-2 mb-5 rounded-md w-48 hover:opacity-90 transition-colors`}>
        Registrar chofer
      </button>
      <TablaChofer />
      <RegistrarChofer
        DefaultRol="Conductor"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBusesAdded={refreshTable}
      />
    </main>
  );
}

export default ChoferUser;
