import { useDispatch, useSelector } from "react-redux";
import {
  onSearchingAlumno,
  onAlumnoFound,
  onAlumnoNotFound,
  setAlumnoRut,
  onLoadingIngresos,
  onClearDatos,
} from "../store/data/ingresoSlice";
import bikeApi from "../api/bikeApi";
import Swal from "sweetalert2";

export const useIngresoStore = () => {
  const dispatch = useDispatch();
  const { user }= useSelector ((state)=>state.auth);
  const { isBuscandoAlumno, alumnoDatos, alumnoRut, ingreso } = useSelector(
    (state) => state.ingreso
  );

  const startSearchAlumno = async (rut) => {
    try {
      dispatch(onSearchingAlumno());

      // Realizar la llamada a la API para buscar el alumno por rut
      const response = await bikeApi.get(`/info/alumnos/rut/${rut}`);
      const alumnoEncontrado = response.data.alumno;

      console.log(alumnoEncontrado);

      // Verificar si se encontró el alumno o no
      if (alumnoEncontrado) {
        // Alumno encontrado
        dispatch(onAlumnoFound(alumnoEncontrado));
      } else {
        // Alumno no encontrado
        dispatch(onAlumnoNotFound());
        Swal.fire('Alumno no registrado, por favor registrar','','warning')
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Alumno no encontrado
        dispatch(onAlumnoNotFound());
        Swal.fire('Alumno no registrado, por favor registrar','','warning')
      } else {
        // Error desconocido
        console.log(error);
      }
    }
  };

  const handleRutChange = (e) => {
    const rut = e.target.value;
    if (rut) {
      dispatch(setAlumnoRut(rut));
    } else {
      // Si el valor es vacío, asignar una cadena vacía al alumnoRut
      dispatch(setAlumnoRut(""));
    }
  };

  const startLoadingIngresos = async () => {
    try {
      dispatch(onSearchingAlumno());

      const { data } = await bikeApi.get("/ingreso/listaIngresos");
      console.log({ data });
      const ingreso = data.ingresos;
      dispatch(onLoadingIngresos(ingreso));
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const startIngresandingALumno = async (alumnoRut,user) => {
    try {
      console.log(user)
      if (!alumnoRut) {
        console.log('El valor de alumnoRut está vacío o es undefined');
        return;
      }
      
      const { data } = await bikeApi.post("/ingreso/newIngreso/", { rut: alumnoRut ,guardia:user.name, });
  
      console.log("alumno ingresado", data);
      
      dispatch(onClearDatos());

    } catch (error) {
      console.log(error)
    }
  };

  const startSaliendingAlumno = async (alumnoRut) => {
    try {


      const { data } = await bikeApi.put("/ingreso/salida/", { rut: alumnoRut});
      console.log("alumno se fue", data);

    } catch (error) {
      if (error) Swal.fire("Alumno no tiene registro de ingreso");
      console.log(error);
    }
  };

  return {
    isBuscandoAlumno,
    alumnoDatos,
    alumnoRut,
    ingreso,
    user,
    startSearchAlumno,
    handleRutChange,
    startIngresandingALumno,
    startSaliendingAlumno,
    startLoadingIngresos,
  };
};
