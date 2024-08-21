import { useEffect, useState } from "react";
import { useGuardiaStore } from "../../hooks/useGuardiaStore";
import { NavBarAdmin } from "./NavBarAdmin";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useModalStore } from "../../hooks/useModalStore";
import { GuardModal } from "./GuardModal";
import "../styles/GuardList.css";

export const GuardList = () => {
  const { guardia, startLoadingGuardias, setActiveGuardia } = useGuardiaStore();
  const [selectedRow, setSelectedRow] = useState(null);
  const { openGuardiaModal } = useModalStore();

  useEffect(() => {
    startLoadingGuardias();
  });

  const onSelectGuardia = (event, guardia) => {
    setActiveGuardia(guardia);
    setSelectedRow(guardia.id);
    console.log(guardia);
  };

  const onDouble = () => {
    openGuardiaModal();
  };

  return (
    <>
      <NavBarAdmin />
      <div className="fondoGuardList">
        <div className="body5">
          <div className="container">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Usuario</TableCell>
                    <TableCell align="right">Contraseña</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {guardia.map((g) => (
                    <TableRow
                      onClick={(event) => onSelectGuardia(event, g)}
                      selected={selectedRow === g.id}
                      onDoubleClick={onDouble}
                      hover
                      key={g.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{g.guardName}</TableCell>
                      <TableCell align="right">{g.guardUser}</TableCell>
                      <TableCell align="right">{g.guardPassword}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <img className="logogestion" src="../assets/LogoDuoc.png"/>
        </div>
        
      </div>
      <GuardModal />
    </>
  );
};
