import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar/TopBar';
import SelectAutobus from '../components/PanelAsignar/SelectAutobus';
import SelectRuta from '../components/PanelAsignar/SelectRuta';
import Tabla from '../components/PanelAsignar/Tabla';
import { useBG, useBGForButtons, useText } from '../ColorClass';
import TableAsignar from '../components/tableAsignar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const API_LINK = import.meta.env.VITE_API_LINK || 'http://localhost:3001';

function VistaAsignar() {
  const MySwal = withReactContent(Swal)
  const theme = 'light';
  const bgColor = useBG(theme);
  const ButtonColor = useBGForButtons(theme);
  const textColor = useText(theme);

  // Estados para mantener los valores seleccionados en los select
  const [selectedAutobus, setSelectedAutobus] = useState('');
  const [selectedRuta, setSelectedRuta] = useState('');
  // Estado para refrescar la tabla al asignar
  const [refreshTable, setRefreshTable] = useState(false);

  const handleAsignar = async () => {
    if (!selectedAutobus || !selectedRuta) {
      Swal.fire({
        title: "Por favor, seleccione un autobús y una ruta.",
        icon: "warning"
      });
      return;
    }
    try {
      console.log('ruta: ' + selectedRuta)
      console.log('bus: ' + selectedAutobus)
      const response = await fetch(`${API_LINK}/autobus/asignar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rutaId: selectedRuta,
          autobusId: selectedAutobus,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        
        Swal.fire({
          title: "Autobus asignado correctamente",
          icon: "success"
        });

        setRefreshTable(!refreshTable);
      } else {
        // alert(result.message || 'Error al asignar el autobús.');
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
      <title>ASIGNAR | GESTOR</title>
      <div className=" flex-col gap-6 items-center">
        {/* Se pasan los estados y setters a los componentes de selección */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <SelectAutobus
            selectedAutobus={selectedAutobus}
            setSelectedAutobus={setSelectedAutobus}
          />
          <SelectRuta 
          selectedRuta={selectedRuta} 
          setSelectedRuta={setSelectedRuta} />
        </div>
        <button
          onClick={handleAsignar}
          className={`${ButtonColor} text-white font-semibold px-4 py-2 my-5 rounded-md w-48 hover:opacity-90 transition-colors`}>
          Asignar
        </button>
      </div>
      {/* La propiedad refresh se utiliza para actualizar la tabla */}
      {/* <Tabla refresh={refreshTable} /> */}
      <TableAsignar refresh={refreshTable} />
    </main>
  );
}

export default VistaAsignar;
