import { createSlice } from '@reduxjs/toolkit';

export const visitaSlice = createSlice({
    name: 'visitas',
    initialState: {
        isLoadingVisitas:true,
        visita:[],
        activeVisita:null,
    },
reducers: {
    onLoadingVisitas: (state, {payload=[]} ) => {
        state.isLoadingVisitas=false;
        payload.forEach(visita=>{
            const exists=state.visita.some(dbVisita=>dbVisita.id===visita.id)
            if(!exists){
                state.visita.push(visita)
            }
        })
    },
    onSetActiveVisita:(state,{payload})=>{
        state.activeVisita=payload
    },

}
})


export const { onLoadingVisitas,onSetActiveVisita} = visitaSlice.actions;