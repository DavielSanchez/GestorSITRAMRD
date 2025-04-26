import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar/TopBar';
import SelectOperador from '../components/PanelAsignarB/SelectOperador';
import SelectRuta from '../components/PanelAsignar/SelectRuta';
import Tabla from '../components/PanelAsignar/Tabla';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import TableAsignarB from '../components/PanelAsignarB/tableAsignarB';
import Swal from 'sweetalert2'

const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

function VistaAsignar() {
  const theme = 'light';
  const bgColor = useBG(theme);
  const ButtonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  // Estados para mantener los valores seleccionados en los select
  const [selectedOperador, setSelectedOperador] = useState('');
  const [selectedRuta, setSelectedRuta] = useState('');
  // Estado para refrescar la tabla al asignar
  const [refreshTable, setRefreshTable] = useState(false);

  const handleAsignar = async () => {
    
    
    if (!selectedOperador || !selectedRuta) {
      Swal.fire({
        title: "Por favor, seleccione un operador y una ruta.",
        icon: "warning"
      });
      return;
    }
  
    try {
      console.log('ruta:', selectedRuta);
      console.log('operador:', selectedOperador);
      
  
      const response = await fetch(`${API_LINK}/usuario/asignar/ruta/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedOperador,
          idRuta: selectedRuta,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Operador asignado correctamente",
          icon: "success"
        });
        setRefreshTable(!refreshTable);
        console.log(result.usuario);
      } else {
        Swal.fire({
          title: result.message,
          icon: "error"
        });
      }
  
    } catch (error) {
      Swal.fire({
        title: "Error en la asignación, por favor intenta de nuevo.",
        icon: "error"
      });
    }
  };
  
  return (
    <main className="flex-1 p-4 md:p-8">
      <title>ASIGNAR B | GESTOR</title>
      <div className=" flex-col gap-6 items-center">
        {/* Se pasan los estados y setters a los componentes de selección */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <SelectOperador
            SelectOperador={selectedOperador}
            setSelectedOperador={setSelectedOperador}
          />
          <SelectRuta selectedRuta={selectedRuta} setSelectedRuta={setSelectedRuta} />
        </div>
        <button
          onClick={handleAsignar}
          className={`${ButtonColor} text-white font-semibold px-4 py-2 my-5 rounded-md w-48 hover:opacity-90 transition-colors`}>
          Asignar
        </button>
      </div>
      {/* La propiedad refresh se utiliza para actualizar la tabla */}
      <TableAsignarB />
    </main>
  );
}

export default VistaAsignar;
