import { useDispatch, useSelector } from "react-redux"
import { onOpenAlumnoModal,onCloseAlumnoModal } from "../store/modal/modalAlumnoSlice";
import { onOpenGuardiaModal } from "../store/modal/modalGuardiaSlice";
import { onCloseGuardiaModal } from "../store/modal/modalGuardiaSlice";


export const useModalStore=()=>{

    const dispatch=useDispatch();

    const {isAlumnoModalOpen}=useSelector(state=>state.modalAlumno);
    const {isGuardiaModalOpen}=useSelector(state=>state.modalGuardia);

    const openAlumnoModal=()=>{
        dispatch( onOpenAlumnoModal());

    };

    const closeAlumnoModal=()=>{
        dispatch(onCloseAlumnoModal())
    };

    //can use like this too.
    const toggleAlumnoModal=()=>{
        (isAlumnoModalOpen)
        ?openAlumnoModal()
        :closeAlumnoModal
    };

    const openGuardiaModal=()=>{
        dispatch( onOpenGuardiaModal());

    };

    const closeGuardiaModal=()=>{
        dispatch(onCloseGuardiaModal())
    };

    //can use like this too.
    const toggleGuardiaModal=()=>{
        (isGuardiaModalOpen)
        ?openGuardiaModal()
        :closeGuardiaModal
    };

    return{
        //properties
        isAlumnoModalOpen,
        isGuardiaModalOpen,
        //metodos
        openAlumnoModal,
        closeAlumnoModal,
        toggleAlumnoModal,
        toggleGuardiaModal,
        closeGuardiaModal,
        openGuardiaModal

    }


}