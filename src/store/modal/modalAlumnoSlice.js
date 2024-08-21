import { createSlice } from '@reduxjs/toolkit';

export const modalAlumnoSlice = createSlice({
    name: 'modalAlumno',
    initialState: {
        isAlumnoModalOpen:false
    },
    reducers: {
        onOpenAlumnoModal:(state)=>{
            state.isAlumnoModalOpen=true;
        },
        onCloseAlumnoModal:(state)=>{
            state.isAlumnoModalOpen=false;
        },

    }
});



export const { onOpenAlumnoModal, onCloseAlumnoModal} = modalAlumnoSlice.actions;