import { useDispatch, useSelector } from "react-redux";
import bikeApi from "../api/bikeApi";
import {
  onDeleteAlumno,
  onLoadingAlumnos,
  onSetActiveAlumno,
  onUpdateAlumno,
} from "../store";
import Swal from "sweetalert2";

export const useAlumnoStore = () => {
  const dispatch = useDispatch();
  const { alumno, activeAlumno } = useSelector((state) => state.alumno);

  const startLoadingAlumno = async () => {
    try {
      const { data } = await bikeApi.get("/info/alumnos");
      const alumnos = data.alumnos;
      dispatch(onLoadingAlumnos(alumnos));

      // Guardar los datos en el almacenamiento local

    } catch (error) {
      console.log("error cargar alumnos");
      console.log(error);
    }
  };

  const setActiveAlumno = (alumnoEvent) => {
    dispatch(onSetActiveAlumno(alumnoEvent));
  };

  const startSavingAlumno = async (alumnoEvent) => {
    try {
      if (alumnoEvent.id) {

        await bikeApi.put(`/info/alumnos/${alumnoEvent.id}`, alumnoEvent);
        dispatch(onUpdateAlumno({ ...alumnoEvent }));
        return;

      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingAlumno = async () => {
    try {
      await bikeApi.delete(`/info/alumnos/${activeAlumno.id}`);
      dispatch(onDeleteAlumno());
      console.log(activeAlumno.id);
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar alumno");
    }
  };

  return {
    alumno,
    activeAlumno,
    startLoadingAlumno,
    startDeletingAlumno,
    startSavingAlumno,
    setActiveAlumno,
  };
};
