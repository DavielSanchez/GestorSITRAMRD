import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import CryptoJS from 'crypto-js';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function BarcodeScanner({ onScanSuccess, active }) {
  const qrCodeRegionId = 'reader';
  const [scanning, setScanning] = useState(false); // Estado para controlar si el escáner está activo
  const hasScannedRef = useRef(false);
  const [cameras, setCameras] = useState([]); // Almacenar cámaras disponibles
  const [selectedCamera, setSelectedCamera] = useState(null); // Cámara seleccionada
  const scannerRef = useRef(null); // Referencia al escáner de QR

  const MySwal = withReactContent(Swal)

  const claveSecreta = '5f9242fb225533bed1706b'; 
  const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

  async function procesarPago({ userId, tarjetaId, amount }) {
    try {
      const response = await fetch(`${API_LINK}/wallet/pagar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, tarjetaId, amount }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error al procesar el pago:', data.error);
        await MySwal.fire({
          title: "Ha ocurrido un error",
          text: data.error,
          icon: "error"
        });
        return;
      }
  
      await MySwal.fire({
        title: "Pago exitoso",
        text: `Pago realizado con éxito.\nSaldo actual: $${data.saldoActual}`,
        icon: "success"
      });
      onScanSuccess(data);
      return data;
    } catch (error) {
      console.error('Error en la solicitud de pago:', error);
      await MySwal.fire({
        title: "Error inesperado",
        text: "Error inesperado al procesar el pago",
        icon: "error"
      });
    }
  }
  

  const handleScan = async (code) => {
    console.log("QR Escaneado:", code);

    try {
      const bytes = CryptoJS.AES.decrypt(code, claveSecreta);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedString) {
        throw new Error("No se pudo desencriptar (clave incorrecta o data corrupta)");
      }

      console.log("Texto desencriptado:", decryptedString);
      const jsonData = JSON.parse(decryptedString);
      console.log("Objeto reconstruido:", jsonData);

      await procesarPago({
        userId: jsonData.userId,
        tarjetaId: jsonData.tarjetaId,
        amount: 20, // o el monto que desees cobrar por boleto
      });

      stopScanner(); // Detener el escáner después de escanear
    } catch (error) {
      console.error("Error al decodificar el código QR:", error);
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    scannerRef.current = html5QrCode;

    // Obtener cámaras disponibles
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        setCameras(devices); 
        // console.log("Cámaras disponibles:", devices);
        setSelectedCamera(devices[2].id); // Seleccionar la primera cámara por defecto
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

  useEffect(() => {
    if (!selectedCamera || scanning || !active || hasScannedRef.current) return;
  
    const readerElement = document.getElementById(qrCodeRegionId);
  
    if (!readerElement || readerElement.offsetWidth === 0 || readerElement.offsetHeight === 0) {
      setTimeout(() => {
        startScanner();
      }, 1000);
    } else {
      startScanner();
    }
  
    return () => {
      stopScanner();
    };
  }, [selectedCamera, scanning, active]);
  

  const startScanner = () => {
    const html5QrCode = scannerRef.current;
  
    html5QrCode.start(
      selectedCamera,
      {
        fps: 10,
        qrbox: { width: 400, height: 400 },
        formatsToSupport: ["QR_CODE"],
      },
      (decodedText) => {
        if (!hasScannedRef.current) {
          hasScannedRef.current = true;
          handleScan(decodedText);
          setTimeout(() => {
            hasScannedRef.current = false;
          }, 5000);
        }
      }
    ).then(() => {
      setScanning(true);
    }).catch(err => {
      console.error('Error al iniciar el escáner:', err);
    });
  };
  

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

  const handleCameraChange = (e) => {
    setSelectedCamera(e.target.value);
    setHasScanned(false); // Reseteamos el estado de escaneo
  };

  return (
    <div>
      {/* <div> */}
        {/* Mostrar las cámaras disponibles para que el usuario elija */}
        {/* <label className='text-black'>Selecciona una cámara: </label>
        <select className='text-black' onChange={handleCameraChange} value={selectedCamera}>
          {cameras.map((camera) => (
            <option className='text-black' key={camera.id} value={camera.id}>
              {camera.label || `Cámara ${camera.id}`}
            </option>
          ))}
        </select>
      </div> */}

      <div id={qrCodeRegionId} style={{ width: '100%', height: '400px', position: 'relative' }} />
      
      {!scanning && <p className='text-2xl text-black'>Esperando a la cámara...</p>}
    </div>
  );
}
