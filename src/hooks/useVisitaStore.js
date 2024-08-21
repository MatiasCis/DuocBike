import { useDispatch, useSelector } from "react-redux";
import bikeApi from "../api/bikeApi";
import { onLoadingVisitas, onSetActiveVisita } from "../store/data/visitaSlice";
import Swal from "sweetalert2";

export const useVisitaStore = () => {
  const dispatch = useDispatch();
  const { visita ,activeVisita} = useSelector((state) => state.visita);

  const startRegisterVisita = async ({ visitaRut, visitaNombre, visitaMarca, visitaLugar, visitaMotivo }) => {
    try {
      const response = await bikeApi.post("/info/newvisitas", { visitaRut, visitaNombre, visitaMarca, visitaLugar, visitaMotivo });
      
      const { data } = response;
      
      if (data.ok) {
        // La visita se creó correctamente
        Swal.fire('Agregado Correctamente', '', 'success');
        startLoadingVisitas();
      } else {
        // Hubo un error al crear la visita
        Swal.fire('Error al agregar visita', data.msg, 'error');
      }
    } catch (error) {
      // Error en la solicitud
      console.log("Error al agregar visita", error);
      Swal.fire('Error al agregar visita', 'Ocurrió un error en el servidor', 'error');
    }
  };
 
  
  
  
  
  

  const startLoadingVisitas = async () => {
    try {
      const { data } = await bikeApi.get("/info/visitas");
      console.log({ data });
      const visita = data.visitas;
      dispatch(onLoadingVisitas(visita));
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  };

  const setActiveVisita = (visitaEvent) => {
    dispatch(onSetActiveVisita(visitaEvent));
  };

  const startSaliendingVisita = async (visitaRut) => {
    try {
      const { data } = await bikeApi.put("/info/salidavisita", {
        rut: activeVisita.visitaRut,
      });
      console.log("visita se fue", data);
    } catch (error) {
      if (error) 
      Swal.fire("Visita no tiene registrado un ingreso");
      console.log(error);
    }
  };

  return {
    visita,
    activeVisita,
    startRegisterVisita,
    startLoadingVisitas,
    setActiveVisita,
    startSaliendingVisita
  };
};
