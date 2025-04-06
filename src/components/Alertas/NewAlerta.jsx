import React, { useState } from 'react';
import ModalNuevaAlerta from './ModalNuevaAlerta';

function NewAlerta() {
  const [showModal, setShowModal] = useState(false);

  const refreshTable = () => {};

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={` bg-[#6a62dc] text-white font-semibold mb-6 mt-10 px-4 py-2 rounded-md w-48 hover:opacity-90 transition-colors`}>
        Enviar nueva alerta
      </button>
      <ModalNuevaAlerta
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onIncidenciaAdded={refreshTable}
      />
    </>
  );
}

export default NewAlerta;
