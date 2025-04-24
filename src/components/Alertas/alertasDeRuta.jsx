import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Warning, Traffic, CloudQueue, Done, DoneAll } from '@mui/icons-material';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import { motion, AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import socket from '../../socket';

function AlertasDeRuta({refreshKey}) {
  const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const userRol = decodedToken.userRol;
  
    const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';
  
    const [isOpen, setIsOpen] = useState(false);
    const [expandedAlert, setExpandedAlert] = useState(null);
    const [alertas, setAlertas] = useState([]);
    const [update, setUpdate] = useState(false);
  
    const noLeidas = alertas.filter((a) => !a.leidaPor.includes(userId)).length;
    const toggleAlertas = () => setIsOpen(!isOpen);
    const toggleExpand = (id) => setExpandedAlert(expandedAlert === id ? null : id);
  
    const markSeen = async (alertaId) => {
      try {
        const response = await fetch(`${API_LINK}/alerta/marcar-leida`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            alertaId,
            userId,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error al marcar la alerta como leída');
        }
  
        const audio = new Audio('/sounds/seen.wav');
        audio.volume = 0.5;
        audio.play();
        const data = await response.json();
        setUpdate(!update);
      } catch (error) {
        console.error('❌ Error marcando la alerta como leída:', error);
      }
    };
  
    // Cargar alertas iniciales
    useEffect(() => {
      const fetchAlertas = async () => {
        try {
            const response = await fetch(`${API_LINK}/alerta/mis-alertas/ruta`, {
              method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, userRol }),
        });

        if (!response.ok) {
          throw new Error('Error al obtener las alertas');
        }

        const data = await response.json();
        setAlertas(data);
      } catch (error) {
        console.error('Error cargando alertas:', error);
      }
    };

    fetchAlertas();
  }, [refreshKey, update]);

  useEffect(() => {
      const handleNuevaAlerta = (nuevaAlerta) => {
        console.log('🔔 Alerta recibida por socket:', nuevaAlerta);
        if (nuevaAlerta.tipo === "general") {
          setAlertas((prev) => {
            const yaExiste = prev.some(alerta => alerta._id === nuevaAlerta._id);
            if (!yaExiste) {
              return [nuevaAlerta, ...prev];
            } else {
              return [...prev]; // Forzamos re-render
            }
          });
        }
      };
  
      socket.on("alerta-recibida", handleNuevaAlerta);
  
      return () => {
        socket.off("alerta-recibida", handleNuevaAlerta);
      };
    }, []);

  return (
    <>
      <div
        className="text-[#6a62dc] mt-10 flex w-full justify-between cursor-pointer select-none"
        onClick={toggleAlertas}>
        <div className="flex items-center gap-4">
  <p className="text-2xl md:text-3xl font-medium">Alertas de rutas</p>
  {noLeidas > 0 && (
    <span className="bg-red-600 text-white text-sm font-semibold px-2 py-0.5 rounded-full">
      {noLeidas}
    </span>
  )}
</div>
        {isOpen ? <ChevronUp size={35} /> : <ChevronDown size={35} />}
      </div>
      <hr className="text-[#6a62dc] mt-3" />

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden mt-4">
            {alertas.length === 0 ? (
  <div className="flex items-center justify-center h-40">
    <p className="text-gray-500 text-lg">No hay alertas disponibles</p>
  </div>
) : (
  alertas.map((alerta) => (
    <motion.div
      key={alerta.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * alerta.id }}
      className="mb-2"
      onClick={() => markSeen(alerta._id)}
    >
      <div
        key={alerta._id}
        className={`p-4 text-md flex justify-between items-center cursor-pointer ${
          expandedAlert === alerta._id ? 'rounded-t-md' : 'rounded-md'
        } shadow-lg transition-all ${
          alerta.tipo === 'emergencia'
            ? 'bg-[#FF5353]'
            : alerta.tipo === 'trafico'
            ? 'bg-[#FD713E]'
            : alerta.tipo === 'clima'
            ? 'bg-[#000DFF]'
            : alerta.tipo === 'operativa'
            ? 'bg-[#FFCC00]'
            : alerta.tipo === 'informativa'
            ? 'bg-[#03B7BD]'
            : 'bg-gray-200'
        }`}
        onClick={() => toggleExpand(alerta._id)}
      >
        <div className="flex gap-5 text-white">
          {alerta.tipo === 'emergencia' ? (
            <Warning />
          ) : alerta.tipo === 'trafico' ? (
            <Traffic />
          ) : alerta.tipo === 'clima' ? (
            <CloudQueue />
          ) : alerta.tipo === 'operativa' ? (
            <BuildIcon />
          ) : alerta.tipo === 'informativa' ? (
            <InfoIcon />
          ) : null}
          <p className="text-lg">{alerta.titulo}</p>
        </div>
        <div className="flex items-center gap-3">
          {alerta.leidaPor.includes(userId) ? (
            <DoneAll className="cursor-pointer text-white hover:text-gray-300 transition" />
          ) : (
            <Done
              className="cursor-pointer text-white hover:text-gray-300 transition"
              onClick={() => markSeen(alerta._id)}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {expandedAlert === alerta._id && (
          <motion.div
            initial={{ maxHeight: 0, opacity: 0, padding: 0 }}
            animate={{ maxHeight: 150, opacity: 1, padding: '16px' }}
            exit={{ maxHeight: 0, opacity: 0, padding: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`${
              alerta.tipo === 'emergencia'
                ? 'bg-[#FF5353]'
                : alerta.tipo === 'trafico'
                ? 'bg-[#FD713E]'
                : alerta.tipo === 'clima'
                ? 'bg-[#000DFF]'
                : alerta.tipo === 'operativa'
                ? 'bg-[#FFCC00]'
                : alerta.tipo === 'informativa'
                ? 'bg-[#03B7BD]'
                : 'bg-gray-200'
            } rounded-b-md shadow-md overflow-hidden`}
          >
            <p className="text-white mb-5 whitespace-pre-line">{alerta.descripcion}</p>
            <span className="text-sm text-white">
              {new Date(alerta.fecha_creacion).toLocaleString()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ))
)}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AlertasDeRuta;
