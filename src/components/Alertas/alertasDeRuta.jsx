import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Warning, Traffic, CloudQueue, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

function AlertasDeRuta() {
  const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
  
    const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';
  
    const [isOpen, setIsOpen] = useState(false);
    const [expandedAlert, setExpandedAlert] = useState(null);
    const [alertas, setAlertas] = useState([]);
  
    const toggleAlertas = () => setIsOpen(!isOpen);
    const toggleExpand = (id) => setExpandedAlert(expandedAlert === id ? null : id);
  
    useEffect(() => {
        const fetchAlertas = async () => {
          try {
            const response = await fetch(`${API_LINK}/alerta/mis-alertas/generales`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId }),
            });
    
            if (!response.ok) {
              throw new Error('Error al obtener las alertas');
            }
    
            const data = await response.json();
            console.log(data);
            setAlertas(data); // Asegúrate de que el backend devuelve un array
          } catch (error) {
            console.error('Error cargando alertas:', error);
          }
        };
    
        fetchAlertas();
      }, []);

  return (
    <>
      <div
        className="text-[#6a62dc] mt-10 flex w-full justify-between cursor-pointer select-none"
        onClick={toggleAlertas}>
        <p className="text-2xl md:text-3xl font-medium">Alertas de rutas</p>
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
            {alertas.map((alerta) => (
              <motion.div
                key={alerta.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * alerta.id }}
                className="mb-2">
                {/* Alerta Principal */}
                <div
                  className={`p-4 text-md flex justify-between items-center cursor-pointer ${
                    expandedAlert === alerta.id ? 'rounded-t-md' : 'rounded-md'
                  }  shadow-lg transition-all 
                                          ${
                                            alerta.tipo === 'emergencia'
                                              ? 'bg-[#FF5353]'
                                              : alerta.tipo === 'trafico'
                                              ? 'bg-[#FD713E]'
                                              : alerta.tipo === 'clima'
                                              ? 'bg-[#000DFF]'
                                              : 'bg-gray-200'
                                          }
                                        `}
                  onClick={() => toggleExpand(alerta.id)}>
                  <div className="flex gap-5 text-white">
                    {alerta.tipo === 'emergencia' ? (
                      <Warning />
                    ) : alerta.tipo === 'trafico' ? (
                      <Traffic />
                    ) : alerta.tipo === 'clima' ? (
                      <CloudQueue />
                    ) : null}
                    <p className="text-lg">{alerta.titulo}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Delete className="cursor-pointer text-white hover:text-gray-300 transition" />
                  </div>
                </div>

                {/* Descripción Expandible */}
                <AnimatePresence>
                  {expandedAlert === alerta.id && (
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
                          : 'bg-gray-200'
                      } rounded-b-md shadow-md overflow-hidden`}>
                      <p className="text-white whitespace-pre-line">{alerta.descripcion}</p>
                      <span className="text-sm text-white">{alerta.fecha}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AlertasDeRuta;
