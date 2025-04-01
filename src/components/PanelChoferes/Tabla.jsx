import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "id", label: "#", minWidth: 50 },
  { id: "placa", label: "Placa", minWidth: 100 },
  { id: "descripcion", label: "Descripción", minWidth: 200 },
  { id: "fecha", label: "Fecha", minWidth: 150 },
  { id: "estado", label: "Estado", minWidth: 100 },
];

function createData(id, placa, descripcion, fecha, estado) {
  return { id, placa, descripcion, fecha, estado };
}

const rows = [
  createData(1, "ABC-123", "Toyota Corolla 2018", "2025-03-10", "Disponible"),
  createData(2, "XYZ-987", "Honda Civic 2020", "2025-03-11", "En servicio"),
  createData(3, "DEF-456", "Ford Fiesta 2017", "2025-03-12", "Disponible"),
  createData(4, "GHI-789", "Hyundai Tucson 2021", "2025-03-13", "Disponible"),
  createData(5, "JKL-321", "Kia Rio 2019", "2025-03-14", "En servicio"),
];

function ChoferesDisponiblesTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h2 className="text-black text-2xl font-bold font-['Inter'] mb-4">
        Choferes Disponibles
      </h2>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "#6a62dc",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          style={{ color: "#6a62dc" }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#6a62dc",
            color: "white",
          }}
        />
      </Paper>
    </div>
  );
}

export default ChoferesDisponiblesTable;
