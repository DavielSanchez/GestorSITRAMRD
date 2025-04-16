import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablaAdmin from '../components/GestorAdmin/TablaAdmin';
import RegistrarAdmin from '../components/GestorAdmin/RegistroAdmin';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import { Admins } from '../components/GestorAdmin/Admins'; 
import { AdminInactivo } from '../components/GestorAdmin/AdminInactivo';

function GestorAdmin() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  const theme = token ? JSON.parse(atob(token.split('.')[1])).theme : 'light';
  

  const refreshTable = () => {};

  return (
    <main className=" bg-white flex-1 p-4 md:p-8 transition-all duration-300">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Admins/>
      <AdminInactivo/>
      </section>

      <button
        onClick={() => setShowModal(true)}
        className={`bg-[#6a62dc] text-white font-semibold px-4 py-2 mb-5 rounded-md w-48 hover:opacity-90 transition-colors`}>
        Registrar Admin
      </button>
      <TablaAdmin />
        <RegistrarAdmin
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onBusesAdded={refreshTable}
        />
    </main>
  );
}

export default GestorAdmin;
