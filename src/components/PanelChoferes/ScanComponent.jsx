import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import CryptoJS from 'crypto-js';

export default function BarcodeScanner({ onScanSuccess }) {
  const qrCodeRegionId = 'reader';
  const [scanning, setScanning] = useState(true);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const scannerRef = useRef(null);

  const secretKey = import.meta.env.VITE_QR_KEY;

  const handleScan = (code) => {
    console.log('QR Escaneado:', code);
  
    try {
      // Primero, decodifica los datos Base64 antes de descifrarlos
      const bytes = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.parse(code), secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  
      console.log(decryptedData);
    } catch (error) {
      console.error("Error al descifrar el código QR:", error);
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    scannerRef.current = html5QrCode;

    // Obtener cámaras disponibles
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        setCameras(devices); // Guardar las cámaras disponibles
        setSelectedCamera(devices[1].id); // Seleccionar la primera cámara por defecto
      } else {
        console.error("No cameras found");
      }
    }).catch(err => {
      console.error("Error al obtener las cámaras:", err);
    });

    return () => {
      stopScanner();
    };
  }, []);

  // Iniciar el escaneo con la cámara seleccionada
  useEffect(() => {
    if (!selectedCamera) return;

    const html5QrCode = scannerRef.current;

    html5QrCode.start(
      selectedCamera,
      {
        fps: 20, // FPS incrementado para mejorar la captura de QR
        qrbox: { width: 400, height: 400 }, // Ajusta el tamaño de la caja de escaneo
        formatsToSupport: ["QR_CODE"], // Forzar la detección de solo códigos QR
      },
      (decodedText) => {
        onScanSuccess(decodedText); // Callback al padre
        stopScanner(); // Detener después de escanear
        handleScan(decodedText)
      },
      (errorMessage) => {
        console.log("Error al leer QR:", errorMessage);
      }
    ).then(() => {
      setScanning(true);
    }).catch(err => {
      console.error('Error al iniciar el escáner:', err);
    });

    return () => {
      stopScanner();
    };
  }, [selectedCamera]);

  // Detener el escáner
  const stopScanner = () => {
    if (scannerRef.current && scanning) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        setScanning(false);
      }).catch(err => {
        console.error("Error al detener el escáner:", err);
      });
    }
  };

  // Manejar cambio de cámara
  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div>
        {/* Mostrar las cámaras disponibles para que el usuario elija */}
        <label className='text-black'>Selecciona una cámara: </label>
        <select className='text-black' onChange={handleCameraChange} value={selectedCamera}>
          {cameras.map((camera) => (
            <option className='text-black' key={camera.id} value={camera.id}>
              {camera.label || `Cámara ${camera.id}`}
            </option>
          ))}
        </select>
      </div>

      <div id={qrCodeRegionId} style={{ width: '100%', height: '400px' }} /> {/* Asegúrate de que el contenedor tiene un tamaño adecuado */}

      {!scanning && <p className='text-black'>Esperando a la cámara...</p>}
    </div>
  );
}
