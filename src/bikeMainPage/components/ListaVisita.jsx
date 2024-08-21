import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useVisitaStore } from '../../hooks/useVisitaStore';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

export const ListaVisita = () => {
  const { startLoadingVisitas, visita, setActiveVisita, startSaliendingVisita, activeVisita } = useVisitaStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [visitaList, setVisitaList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    startLoadingVisitas();
  }, []);

  useEffect(() => {
    setVisitaList(visita);
  }, [visita]);

  useEffect(() => {
    if (activeVisita && activeVisita.horaSalida) {
      // La visita tiene una hora de salida, actualiza la lista de visitas
      setVisitaList((prevList) =>
        prevList.map((v) =>
          v.id === activeVisita.id ? { ...v, horaSalida: activeVisita.horaSalida } : v
        )
      );
    }
  }, [activeVisita]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterVisita = (visita) => {
    if (searchValue === "") {
      return true;
    } else {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      return (
        visita?.visitaRut?.toLowerCase().includes(lowerCaseSearchValue) ||
        visita?.visitaNombre?.toLowerCase().includes(lowerCaseSearchValue)
      );
    }
  };

  const filteredVisita = visita.filter((v, index) => {
    return visita.findIndex((b) => b.id === v.id) === index && filterVisita(v);
  });

  filteredVisita.sort((v, b) =>
    v.visitaID && b.visitaID ? v.visitaID.localeCompare(b.visitaID) : 0
  );

  const onSelectVisita = (event, visita) => {
    setActiveVisita(visita);
    setSelectedRow(visita.id);
  };

  const onSalirVisita = (e) => {
    e.preventDefault();

    Swal.fire({
      title: `¿Confirmas la salida de ${activeVisita.visitaNombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Salida realizada correctamente', '', 'success');
        startSaliendingVisita(activeVisita.visitaRut).then(() => {
          startLoadingVisitas();
        });
      }
    });
  };

  const paginatedVisita = filteredVisita.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const exportToExcel = () => {
    const dataSet = filteredVisita.map((v) => ({
      Rut: v.visitaRut,
      Nombre: v.visitaNombre,
      Marca: v.visitaMarca,
      Lugar: v.visitaLugar,
      Motivo: v.visitaMotivo,
      "Hora Ingreso": v.horaIngreso,
      "Hora Salida": v.horaSalida,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataSet);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitas");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "Visitas.xlsx";
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Buscar por rut o nombre"
      />
      <button className="btn btn-ligh" onClick={exportToExcel}>Exportar a Excel</button>
      <TableContainer component={Paper} className="listaVisita">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Rut</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Marca</TableCell>
              <TableCell align="right">Lugar</TableCell>
              <TableCell align="right">Motivo</TableCell>
              <TableCell align="right">Entrada</TableCell>
              <TableCell align="right">Salida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVisita.map((v) => (
              <TableRow
                key={v.id}
                hover
                onClick={(event) => onSelectVisita(event, v)}
                selected={selectedRow === v.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{v.visitaRut}</TableCell>
                <TableCell align="right">{v.visitaNombre}</TableCell>
                <TableCell align="right">{v.visitaMarca}</TableCell>
                <TableCell align="right">{v.visitaLugar}</TableCell>
                <TableCell align="right">{v.visitaMotivo}</TableCell>
                <TableCell align="right">{v.horaIngreso}</TableCell>
                <TableCell align="right">{v.horaSalida}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredVisita.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={[5]}
        />
      </TableContainer>
      <button className="btn btn-danger" onClick={onSalirVisita}>
        Salida
      </button>
    </div>
  );
};
