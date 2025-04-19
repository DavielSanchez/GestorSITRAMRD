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
import { useBG, usePrimaryColors, useText } from "../../ColorClass";

const API_URL = import.meta.env.VITE_API_LINK || "http://localhost:3001";// Reemplaza con la URL real

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

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
                Autobuses asignados
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Placa</TableCell>
                    <TableCell>Modelo</TableCell>
                    <TableCell>Capacidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.buses.map((bus) => (
                    <TableRow key={bus._id}>
                      <TableCell>{bus._id}</TableCell>
                      <TableCell>{bus.placa}</TableCell>
                      <TableCell>{bus.modelo}</TableCell>
                      <TableCell>{bus.capacidad}</TableCell>
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
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error cargando rutas:", err));

    // Obtener autobuses
    fetch(`${API_URL}/auth/users/`)
      .then((res) => res.json())
      .then((data) => {
        const rol = data.filter((u) => u.userRol === "Operador");
        setBuses(rol);
      })
      .catch((err) => console.error("Error cargando autobuses:", err));
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
