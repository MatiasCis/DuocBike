import { useEffect, useState } from "react";
import { useIngresoStore } from "../../hooks/useIngresoStore";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import "../styles/ListIngreso.css";
import * as XLSX from "xlsx";

export const ListIngreso = () => {
  const { startLoadingIngresos, ingreso } = useIngresoStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    startLoadingIngresos();
  }, []);

  const sortedIngresos = ingreso.slice().reverse();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, sortedIngresos.length - page * rowsPerPage);

  const exportToExcel = () => {
    const dataSet = sortedIngresos
      .filter(
        (i) =>
          i.rutAlumno.toLowerCase().includes(searchValue.toLowerCase()) ||
          i.nombreAlumno.toLowerCase().includes(searchValue.toLowerCase()) ||
          i.guardia.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((i) => ({
        Rut: i.rutAlumno,
        Nombre: i.nombreAlumno,
        "Modelo Bicicleta": i.biciAlumno,
        "Hora Ingreso": i.horaIngreso,
        "Hora Salida": i.horaSalida,
        Guardia: i.guardia,
      }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Ingresos");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "Ingresos.xlsx";
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <>
      <div className="fondo9">
        <div className="body9">
          <div className="container9">
            <div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Rut, nombre de alumno o nombre de guardia"
                style={{ width: "30%" }}
              />
              <button className="btn btn-light " onClick={exportToExcel}>
                Exportar a Excel
              </button>
            </div>
            <TableContainer className="form9" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Rut</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Modelo Bicicleta</TableCell>
                    <TableCell align="right">Hora Ingreso</TableCell>
                    <TableCell align="right">Hora Salida</TableCell>
                    <TableCell align="right">Guardia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? sortedIngresos
                        .filter(
                          (i) =>
                            i.rutAlumno
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            i.nombreAlumno
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()) ||
                            i.guardia
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                    : sortedIngresos
                  ).map((i) => (
                    <TableRow key={i.id}>
                      <TableCell align="center">{i.rutAlumno}</TableCell>
                      <TableCell align="right">{i.nombreAlumno}</TableCell>
                      <TableCell align="right">{i.biciAlumno}</TableCell>
                      <TableCell align="right">{i.horaIngreso}</TableCell>
                      <TableCell align="right">{i.horaSalida}</TableCell>
                      <TableCell align="right">{i.guardia}</TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={sortedIngresos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Filas por página"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
          <img
            className="logoIngreso"
            src="../assets/LogoDuoc.png"
            alt="Logo Duoc"
          />
        </div>
      </div>
    </>
  );
};
