import { useDispatch, useSelector } from "react-redux";
import bikeApi from "../api/bikeApi";
import { onDeleteGuardia, onLoadingGuardias, onSetActiveGuardia, onUpdateGuardia } from "../store";
import Swal from "sweetalert2";

export const useGuardiaStore =  () => {

    const dispatch=useDispatch();
    const {guardia,activeGuardia}=useSelector((state)=>state.guardias);





  const startLoadingGuardias = async () => {
    try {
      const { data } = await bikeApi.get('/info/guardias');
      console.log( {data});
     const guardia=data.guardias
      dispatch( onLoadingGuardias(guardia));
    } catch (error) {
      console.log("error cargar guardias");
      console.log(error);
    }
  };


  const setActiveGuardia=(guardiaEvent)=>{
    
    dispatch(onSetActiveGuardia(guardiaEvent))

  }

  const startSavingGuardia=async(guardiaEvent)=>{

    try {

      if(guardiaEvent.id){


        await bikeApi.put(`/info/guardias/${guardiaEvent.id}`,guardiaEvent);

        dispatch(onUpdateGuardia({...guardiaEvent}))
        return


      }


      
    } catch (error) {

      console.log(error);
      Swal.fire('Error al guardar',error.response.data.msg,'error')
      
    }



  }



  const startDeletingGuardia= async () => {
    try {
      await bikeApi.delete(`/info/guardias/${activeGuardia.id}`);
      dispatch(onDeleteGuardia());
      console.log(activeGuardia.id);
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar alumno");
    }
  };

  return {
    //propiedades
    guardia,
    activeGuardia,

    //metodos
    startLoadingGuardias,
    setActiveGuardia,
    startSavingGuardia,
    startDeletingGuardia,
  };
};
