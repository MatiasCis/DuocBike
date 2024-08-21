import { useState, useEffect } from "react";
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
import * as XLSX from "xlsx";
import "../styles/BikeList.css";
import { useModalStore } from "../../hooks/useModalStore";
import { AlumnoModal } from "./AlumnoModal";
import { useAlumnoStore } from "../../hooks";

export const BikeList = () => {
  const { alumno, startLoadingAlumno, setActiveAlumno } = useAlumnoStore();
  const [selectedRow, setSelectedRow] = useState(null);
  const [shouldReloadData, setShouldReloadData] = useState(false);
  const { openAlumnoModal } = useModalStore();
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      await startLoadingAlumno();
    };

    fetchData();
  }, [startLoadingAlumno]);

  const onDouble = () => {
    openAlumnoModal();
  };

  const onSelectAlumno = (event, alumno) => {
    setActiveAlumno(alumno);
    setSelectedRow(alumno.id);
    console.log(alumno);
  };

  const handleDataUpdate = () => {
    setShouldReloadData(!shouldReloadData);
    startLoadingAlumno();
    setSearchValue("");
  };

  const filterAlumno = (alumno) => {
    if (searchValue === "") {
      return true;
    } else {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return (
        alumno?.registerRut?.toLowerCase().includes(lowerCaseSearchValue) ||
        alumno?.registerName?.toLowerCase().includes(lowerCaseSearchValue)
      );
    }
  };

  const filteredAlumno = alumno.filter((a, index) => {
    return alumno.findIndex((b) => b.id === a.id) === index && filterAlumno(a);
  });

  filteredAlumno.sort((a, b) => (a.registerID && b.registerID) ? a.registerID.localeCompare(b.registerID) : 0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedAlumno = filteredAlumno.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const exportToExcel = () => {
    const dataSet = filteredAlumno.map((a) => ({
      "ID Bicicleta": a.registerID,
      Nombre: a.registerName,
      Rut: a.registerRut,
      Carrera: a.registerCarrer,
      Marca: a.registerBrand,
      Color: a.registerColor,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "Alumnos.xlsx";
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
      <div className="fondo4">
        <div className="body4">      
          <div className="container4">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar por rut o nombre"
            />
            <button className="btn btn-ligh"  onClick={exportToExcel}>Exportar a Excel</button>
            <TableContainer className="form4" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">ID Bicicleta</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Rut</TableCell>
                    <TableCell align="right">Carrera</TableCell>
                    <TableCell align="right">Marca</TableCell>
                    <TableCell align="right">Color</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedAlumno.map((a) => (
                    <TableRow
                      onClick={(event) => onSelectAlumno(event, a)}
                      onDoubleClick={onDouble}
                      hover
                      key={a.id}
                      selected={selectedRow === a.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{a.registerID}</TableCell>
                      <TableCell align="right">{a.registerName}</TableCell>
                      <TableCell align="right">{a.registerRut}</TableCell>
                      <TableCell align="right">{a.registerCarrer}</TableCell>
                      <TableCell align="right">{a.registerBrand}</TableCell>
                      <TableCell align="right">{a.registerColor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={filteredAlumno.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Filas por página"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
          <img className="logo4" src="../assets/LogoDuoc.png" alt="Logo Duoc" />
        </div>
      </div>
      <AlumnoModal onDataUpdate={handleDataUpdate} />
    </>
  );
};
