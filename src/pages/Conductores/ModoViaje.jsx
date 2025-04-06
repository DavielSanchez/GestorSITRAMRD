import { useState } from "react";
import BarcodeScanner from "../../components/PanelChoferes/ScanComponent";
import CryptoJS from 'crypto-js';

function ModoViaje() {
  const [qrcode, setQrcode] = useState('')
  const secretKey = import.meta.env.VITE_QR_KEY;

  
  
  const handleScan = (code) => {
    console.log('QR Escaneado:', code);
    

    const bytes = CryptoJS.AES.decrypt(code, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    setQrcode(bytes)
    console.log(decryptedData)
    console.log(secretKey)

    
  };
  return (
    <main className="flex-1 p-4 md:px-8 md:py-8 flex flex-col items-center">
      <h1 className="text-[#6a62dc] text-5xl md:text-6xl font-semibold font-['Inter'] text-center">
        Validación de boletos
      </h1>

      <div className="w-60 h-60 md:w-80 md:h-80 bg-[#f1f1ff] rounded-2xl flex flex-col items-center justify-center mt-6 md:mt-8 mb-4 md:mb-6 p-6">
        <img
          className="w-32 h-32 md:w-50 md:h-50"
          src="../../src/assets/QRSITRAMRD.png"
          alt="Escáner"
        />
      </div>

      {qrcode !== '' ? <h1 className="text-[#6a62dc]" >{qrcode}</h1> : <h1 className="text-[#6a62dc]">no hay codigo</h1> }



      <BarcodeScanner onScanSuccess={handleScan}/>
    </main>
  );
}

export default ModoViaje;
