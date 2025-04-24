import { useState, useEffect } from "react";
import BarcodeScanner from "../../components/PanelChoferes/ScanComponent";
import CryptoJS from 'crypto-js';

function ModoViaje() {
  const [showScannerModal, setShowScannerModal] = useState(false);

  const handleScanSuccess = (data) => {
    console.log("QR Escaneado correctamente en ModoViaje:", data);
    setShowScannerModal(false); 
  };


  return (
    <main className="flex-1 p-4 md:px-8 md:py-8 flex flex-col items-center">
      <title>MODO VIAJE | GESTOR</title>
      <h1 className="text-[#6a62dc] text-5xl md:text-6xl font-semibold font-['Inter'] text-center">
        Validación de boletos
      </h1>

      <div className="w-72 h-72 md:w-96 md:h-96 bg-[#f1f1ff] rounded-2xl flex flex-col items-center justify-center mt-8 md:mt-10 mb-4 md:mb-6 p-6 cursor-pointer">
  <img
    className="w-40 h-40 md:w-64 md:h-64"
    src="../../src/assets/QRSITRAMRD.png"
    alt="Escáner"
  />
</div>
      <button onClick={() => setShowScannerModal(true)} className="text-white text-xl bg-[#6a62dc] rounded-2xl py-3 px-10">Escanear Qr</button>
      {showScannerModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={() => setShowScannerModal(false)}
      >
        ✖
      </button>
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#6a62dc]">Escanea el QR</h2>
      <BarcodeScanner 
      onScanSuccess={handleScanSuccess}
      active={showScannerModal} />
    </div>
  </div>
)}
    </main>
  );
}

export default ModoViaje;
