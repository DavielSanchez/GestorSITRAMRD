import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function EnhancedTable() {
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const renderEstadoIcon = (estado) => {
    const estadoNormalized = estado?.toLowerCase();
    switch (estadoNormalized) {
      case "pendiente":
        return <span className="text-orange-500 text-lg font-bold">⦿</span>;
      case "en proceso":
        return <span className="text-blue-500 text-lg font-bold">⦿</span>;
      case "resuelto":
        return <span className="text-green-500 text-lg font-bold">⦿</span>;
      default:
        return <span>{estado}</span>;
    }
  };

  const columns = [
    { id: 'Order', label: '#', minWidth: 50, align: 'center' },
    { id: 'Placa', label: 'Placa', minWidth: 100, align: 'center' },
    { id: 'Fecha', label: 'Fecha', minWidth: 170, align: 'center' },
    { id: 'Estado', label: 'Estado', minWidth: 170, align: 'center' },
    { id: 'Descripcion', label: 'Descripcion', minWidth: 170, align: 'center' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_LINK}/incidencia/all`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (!Array.isArray(data)) {
        throw new Error("La API no devolvió un array.");
      }

      const rowsData = data.map((Incidencia, index) =>
        createData(
          index + 1,
          Incidencia.idAutoBus,
          Incidencia.fechaDeReporte ? new Date(Incidencia.fechaDeReporte).toLocaleString() : "N/A",
          renderEstadoIcon(Incidencia.estado),
          Incidencia.descripcion
        )
      );

      setRows(rowsData);
    } catch (error) {
      console.error("Error fetching incidencias:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function createData(Order, Placa, Fecha, Estado, Descripcion) {
    return { Order, Placa, Fecha, Estado, Descripcion };
  }



  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, zIndex: 0 }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell key="acciones" align="center" style={{ minWidth: 100 }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return(
                <TableRow hover role="checkbox" tabIndex={-1} key={row.Order}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                  <div className="d-flex justify-content-end">
                  <div
                      data-svg-wrapper
                      className="cursor-pointer"
                      onClick={() => handleEditClick(row._id)}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M10.5 2.82861L14.5 6.82861M1 16.3284H5L15.5 5.82843C15.7626 5.56578 15.971 5.25398 16.1131 4.91082C16.2553 4.56766 16.3284 4.19986 16.3284 3.82843C16.3284 3.45699 16.2553 3.0892 16.1131 2.74604C15.971 2.40287 15.7626 2.09107 15.5 1.82843C15.2374 1.56578 14.9256 1.35744 14.5824 1.2153C14.2392 1.07316 13.8714 1 13.5 1C13.1286 1 12.7608 1.07316 12.4176 1.2153C12.0744 1.35744 11.7626 1.56578 11.5 1.82843L1 12.3284V16.3284Z"
                          stroke="#6A62DC"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                </div>
                </TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}