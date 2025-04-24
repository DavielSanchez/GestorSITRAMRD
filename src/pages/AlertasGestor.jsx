import React, { useState } from 'react';
import AlertasPersonales from '../components/Alertas/alertasPersonales';
import PersonalesCard from '../components/Alertas/PersonalesCard';
import GeneralesCard from '../components/Alertas/GeneralesCard copy';
import RutasCard from '../components/Alertas/RutasCard';
import NewAlerta from '../components/Alertas/NewAlerta';
import AlertasGenerales from '../components/Alertas/alertasGenerales';
import AlertasDeRuta from '../components/Alertas/alertasDeRuta';
import socket from '../socket';
import { jwtDecode } from 'jwt-decode';
function Alertas() {
  const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRol = decodedToken.userRol;

  const [refreshKey, setRefreshKey] = useState(0);

  socket.on("alerta-recibida", (alerta) => {

  });
  

  const handleNewAlert = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <main className="lg:mt-8 text-black">
      <title>ALERTAS | GESTOR</title>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <PersonalesCard />
          <GeneralesCard />
          <RutasCard />
        </section>
        {
          userRol === 'Conductor' ? null : <NewAlerta onNewAlert={handleNewAlert} />
        }
        <AlertasPersonales refreshKey={refreshKey} />
        <AlertasGenerales refreshKey={refreshKey} />
        <AlertasDeRuta refreshKey={refreshKey} />
      </main>
        
    </>
  );
}

export default Alertas;
