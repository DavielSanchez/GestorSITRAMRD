import { useState, useEffect } from "react";
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
import { jwtDecode } from 'jwt-decode';
import { TablePagination } from "@mui/material";

const API_URL = import.meta.env.VITE_API_LINK || "http://localhost:3001";

function Row({ row }) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const paginatedParadas = row.paradas.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
  
    console.log(row)
  
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
                  Paradas
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Descripcion</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {paginatedParadas.map((parada) => (
                    <TableRow key={parada._id}>
                      <TableCell>{parada._id}</TableCell>
                      <TableCell>{parada.nombre}</TableCell>
                      <TableCell>{parada.descripcion}</TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[1, 3, 5, 10]}
                component="div"
                count={row.paradas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    backgroundColor: '#6a62dc',
                    color: 'white',
                  }}
              />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      nombreRuta: PropTypes.string.isRequired,
      paradas: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
          descripcion: PropTypes.string.isRequired,
        })
      ).isRequired,
      buses: PropTypes.array.isRequired,
      tipo: PropTypes.string.isRequired,
      Tarifa: PropTypes.number.isRequired,
      estado: PropTypes.string.isRequired,
    }).isRequired,
  };

  
function TablaRuta() {
    const [routes, setRoutes] = useState([]);
    const [buses, setBuses] = useState([]);
    const [paradas, setParadas] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
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
  
    useEffect(() => {
      // Obtener rutas
      fetch(`${API_URL}/ruta/all`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setRoutes(data)})
        .catch((err) => console.error("Error cargando rutas:", err));
  
      // Obtener autobuses
      fetch(`${API_URL}/autobus/all`)
        .then((res) => res.json())
        .then((data) => setBuses(data))
        .catch((err) => console.error("Error cargando autobuses:", err));
    }, []);
  
    // Relacionar autobuses con sus rutas
    const enhancedRoutes = routes.map((route) => ({
      ...route,
      buses: buses.filter((bus) => bus.IdRuta === route.IdRuta)
    }));
  
    return (
        <>
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
  {enhancedRoutes
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row) => (
      <Row key={row._id || row.id} row={row} />
    ))}
</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25, 100]}
      component="div"
      count={routes.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        backgroundColor: '#6a62dc',
        color: 'white',
      }}
    />
    </>
    );
}

export default TablaRuta
