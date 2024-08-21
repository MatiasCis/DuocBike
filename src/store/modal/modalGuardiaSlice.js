import { createSlice } from '@reduxjs/toolkit';

export const modalGuardiaSlice = createSlice({
    name: 'modalGuardia',
    initialState: {
        isGuardiaModalOpen:false,
    },
    reducers: {
        onOpenGuardiaModal:(state)=>{
            state.isGuardiaModalOpen=true;
        },
        onCloseGuardiaModal:(state)=>{
            state.isGuardiaModalOpen=false;
        },

    }
});



export const { onOpenGuardiaModal,onCloseGuardiaModal } = modalGuardiaSlice.actions;