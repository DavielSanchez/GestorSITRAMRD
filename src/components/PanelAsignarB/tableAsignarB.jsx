import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBG, usePrimaryColors, useText } from "../../ColorClass";
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_LINK || "http://localhost:3001";// Reemplaza con la URL real

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async (operadorId, rutaId) => {
    try {
      const response = await fetch(`${API_URL}/usuario/ruta/quitar/${operadorId}/${rutaId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Ruta quitada del operador exitosamente.");
        // Aquí podrías actualizar el estado para refrescar la tabla
      } else {
        alert(result.message || "Error al quitar la ruta.");
      }
    } catch (error) {
      console.error("Error en handleDelete:", error);
      alert("Error al hacer la solicitud.");
    }
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.nombreRuta}</TableCell>
        <TableCell align="right">{row.paradas.length}</TableCell>
        <TableCell align="right">{row.buses.length}</TableCell>
        <TableCell align="right">{row.tipo}</TableCell>
        <TableCell align="right">RD${row.Tarifa}</TableCell>
        <TableCell align="right">{row.estado}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Operadores asignados a rutas
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.buses.map((items) => (
                    <TableRow key={items._id}>
                      <TableCell>{items.nombre}</TableCell>
                      <TableCell>{items.userRol}</TableCell>
                      <TableCell align='right'> 
                      <IconButton  color='error' onClick={() => handleDelete(items._id, row._id)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    stops: PropTypes.number.isRequired,
    buses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        plate: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired,
      })
    ).isRequired,
    type: PropTypes.string.isRequired,
    fare: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default function TableAsignar() {
  const [users, setUsers] = React.useState([]);
  const [buses, setBuses] = React.useState([]);

  const token = localStorage.getItem("token");
    let userId = null;
    let theme = 'light'
    try {
        if (token) {
            const decodedToken = jwtDecode(token);
            userId = decodedToken?.id;
            theme = decodedToken?.theme;
        }
    } catch (error) {
        console.error("Error al decodificar el token:", error);
    }

    const bgColor = useBG(theme);
    const textColor = useText(theme);
    const primaryColor = usePrimaryColors()

    React.useEffect(() => {
      // Obtener rutas
      fetch(`${API_URL}/ruta/all`)
        .then((res) => res.json())
        .then((rutas) => {
          setUsers(rutas); // O tal vez deberías usar setRutas(rutas);
          
          // Obtener usuarios después de que se hayan cargado las rutas
          fetch(`${API_URL}/auth/users/`)
            .then((res) => res.json())
            .then((usuarios) => {
              const operadoresConRuta = usuarios.filter((usuario) => {
                return (
                  usuario.userRol === "Operador" &&
                  usuario.rutasAsignadas?.some(rutaId =>
                    rutas.some(r => r._id === rutaId)
                  )
                );
              });
              setBuses(operadoresConRuta);
            })
            .catch((err) => console.error("Error cargando autobuses:", err));
        })
        .catch((err) => console.error("Error cargando rutas:", err));
    }, []);
    

  // Relacionar autobuses con sus rutas
  const enhancedUsers = users.map((route) => ({
    ...route,
    buses: buses.filter((bus) => bus.IdRuta === route.IdRuta)
  }));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
      <TableHead className="!bg-[#6a62dc]">
        <TableRow>
          <TableCell className={`${primaryColor} !uppercase !font-bold`}> </TableCell>
          <TableCell className="!text-white !uppercase !font-bold">Nombre de la ruta</TableCell>
          <TableCell className="!text-white !uppercase !font-bold" align="right">Paradas</TableCell>
          <TableCell className="!text-white !uppercase !font-bold" align="right">Autobuses</TableCell>
          <TableCell className="!text-white !uppercase !font-bold" align="right">Tipo (g)</TableCell>
          <TableCell className="!text-white !uppercase !font-bold" align="right">Tarifa (g)</TableCell>
          <TableCell className="!text-white !uppercase !font-bold" align="right">Estado (g)</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          {enhancedUsers.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
