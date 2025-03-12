import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ModalEditar from './ModalEditar';

export default function EnhancedTable() {
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedIncidencia, setSelectedIncidencia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Se guarda además el objeto original en "data"
  const createData = (Order, id, Placa, Fecha, Estado, Descripcion, data) => {
    return { Order, id, Placa, Fecha, Estado, Descripcion, data };
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_LINK}/incidencia/all`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      console.log("Respuesta de la API:", data);

      let incidenciasArray = [];
      if (Array.isArray(data)) {
        incidenciasArray = data;
      } else if (data.incidencias && Array.isArray(data.incidencias)) {
        incidenciasArray = data.incidencias;
      } else {
        throw new Error("La API no devolvió un array.");
      }

      const rowsData = incidenciasArray.map((inc, index) =>
        createData(
          index + 1,
          inc._id,
          inc.idAutoBus,
          inc.fechaDeReporte ? new Date(inc.fechaDeReporte).toLocaleString() : "N/A",
          renderEstadoIcon(inc.estado),
          inc.descripcion,
          inc // guardamos el objeto original para usar en el modal
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Desea eliminar incidencia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_LINK}/incidencia/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            Swal.fire("Eliminado", "La incidencia ha sido eliminada", "success");
          } else {
            Swal.fire("Error", "Error al eliminar la incidencia", "error");
          }
        } catch (error) {
          console.error("Error al eliminar incidencia:", error);
          Swal.fire("Error", "Error al eliminar la incidencia", "error");
        }
      }
    });
  };

  const handleEditClick = (incidencia) => {
    setSelectedIncidencia(incidencia);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIncidencia(null);
  };

  const handleEstadoUpdated = (id, nuevoEstado) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, Estado: renderEstadoIcon(nuevoEstado) } : row
      )
    );
  };

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
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Botón de editar */}
                        <div
                          data-svg-wrapper
                          className="cursor-pointer"
                          onClick={() => handleEditClick(row.data)}
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
                        {/* Botón de eliminar */}
                        <div
                          data-svg-wrapper
                          className="cursor-pointer"
                          onClick={() => handleDelete(row.id)}
                        >
                          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path
                              d="M17 5H1M16 5L15 17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17L2 5M12 5V2C12 1.73478 11.8946 1.48043 11.7071 1.29289C11.5196 1.10536 11.2652 1 11 1H7C6.73478 1 6.48043 1.10536 6.29289 1.29289C6.10536 1.48043 6 1.73478 6 2V5M11 10L7 14M7 10L11 14"
                              stroke="#FF1414"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
      {selectedIncidencia && (
        <ModalEditar
          isOpen={isModalOpen}
          onClose={handleModalClose}
          incidencia={selectedIncidencia}
          onEstadoUpdated={handleEstadoUpdated}
          API_LINK={API_LINK}
        />
      )}
    </>
  );
}
