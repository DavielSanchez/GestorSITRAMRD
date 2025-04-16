import React, { useState } from 'react';
import AlertasPersonales from '../components/Alertas/alertasPersonales';
import PersonalesCard from '../components/Alertas/PersonalesCard';
import GeneralesCard from '../components/Alertas/GeneralesCard copy';
import RutasCard from '../components/Alertas/RutasCard';
import NewAlerta from '../components/Alertas/NewAlerta';
import AlertasGenerales from '../components/Alertas/alertasGenerales';
import AlertasDeRuta from '../components/Alertas/alertasDeRuta';

function Alertas() {

  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewAlert = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <main className="lg:mt-8 text-black">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <PersonalesCard />
          <GeneralesCard />
          <RutasCard />
        </section>
        <NewAlerta onNewAlert={handleNewAlert} />
        <AlertasPersonales refreshKey={refreshKey} />
        <AlertasGenerales refreshKey={refreshKey} />
        <AlertasDeRuta refreshKey={refreshKey} />
      </main>
    </>
  );
}

export default Alertas;
