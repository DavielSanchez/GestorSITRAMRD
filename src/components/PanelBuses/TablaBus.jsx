import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ModalEditar from "./EditarBus";

export default function EnhancedTable() {
  const API_LINK = import.meta.env.VITE_API_LINK || "http://localhost:3001";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedAutoBus, setSelectedAutoBus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { id: "Order", label: "#", minWidth: 50, align: "center" },
    { id: "Placa", label: "Placa", minWidth: 100, align: "center" },
    { id: "Modelo", label: "Modelo", minWidth: 170, align: "center" },
    { id: "Fecha", label: "Fecha", minWidth: 170, align: "center" },
    { id: "Capacidad", label: "Capacidad", minWidth: 170, align: "center" },
    { id: "Estado", label: "Estado", minWidth: 170, align: "center" },
  ];

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createData = (
    Order,
    id,
    Placa,
    Modelo,
    Fecha,
    Capacidad,
    Estado,
    data
  ) => {
    return { Order, id, Placa, Modelo, Fecha, Capacidad, Estado, data };
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_LINK}/autobus/all`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();

      let autobusesArray = Array.isArray(data) ? data : [];
      const rowsData = autobusesArray.map((bus, index) =>
        createData(
          index + 1,
          bus._id,
          bus.placa || "N/A",
          bus.modelo || "N/A",
          bus.fechaCreacion ? new Date(bus.fechaCreacion).toLocaleString() : "N/A",
          bus.capacidad || "N/A",
          bus.estado || "N/A",
          bus
        )
      );

      setRows(rowsData);
    } catch (error) {
      console.error("Error fetching autobuses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Desea eliminar este vehículo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_LINK}/autobus/delete/${id}`, {
            method: "DELETE",
          });
          const responseData = await response.json();

          if (response.ok) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            Swal.fire("Eliminado", "El vehículo ha sido eliminado", "success");
          } else {
            Swal.fire(
              "Error",
              responseData.message || "Error al eliminar el vehículo",
              "error"
            );
          }
        } catch (error) {
          console.error("Error al eliminar vehículo:", error);
          Swal.fire("Error", "Error al eliminar el vehículo", "error");
        }
      }
    });
  };

  const handleEditClick = (autobus) => {
    setSelectedAutoBus(autobus);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAutoBus(null);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="acciones"
                  align="center"
                  style={{ minWidth: 100 }}
                >
                  Acciones
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
                        <div
                          className="cursor-pointer"
                          onClick={() => handleEditClick(row.data)}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <path
                              d="M10.5 2.82861L14.5 6.82861M1 16.3284H5L15.5 5.82843C15.7626 5.56578 15.971 5.25398 16.1131 4.91082C16.2553 4.56766 16.3284 4.19986 16.3284 3.82843C16.3284 3.45699 16.2553 3.0892 16.1131 2.74604C15.971 2.40287 15.7626 2.09107 15.5 1.82843C15.2374 1.56578 14.9256 1.35744 14.5824 1.2153C14.2392 1.07316 13.8714 1 13.5 1C13.1286 1 12.7608 1.07316 12.4176 1.2153C12.0744 1.35744 11.7626 1.56578 11.5 1.82843L1 12.3284V16.3284Z"
                              stroke="#6A62DC"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => handleDelete(row.id)}
                        >
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                          >
                            <path
                              stroke="#FF1414"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 5H1M16 5L15 17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17L2 5M11 10L7 14M7 10L11 14"
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
      <ModalEditar
        isOpen={isModalOpen}
        onClose={handleModalClose}
        autobus={selectedAutoBus}
        API_LINK={API_LINK}
      />
    </>
  );
}
