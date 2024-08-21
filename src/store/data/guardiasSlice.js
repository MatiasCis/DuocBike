import { createSlice } from '@reduxjs/toolkit';

export const guardiasSlice = createSlice({
    name: 'guardias',
    initialState: {
        isLoadingGuardias:true,
        guardia:[],
        activeGuardia:null
        
    },
    reducers: {
        onLoadingGuardias: (state,{payload=[]} ) => {
            state.isLoadingGuardias=false;
            payload.forEach(guardia=>{
                const exists=state.guardia.some(dbGuardia=>dbGuardia.id===guardia.id)
                if(!exists){
                    state.guardia.push(guardia)
                    
                }
            })
        },
        onSetActiveGuardia:(state,{payload})=>{
            state.activeGuardia=payload;
        },

        onUpdateGuardia: (state, { payload }) => {
            state.guardia = state.guardia
              .map(guardia => (guardia.id === payload.id ? payload : guardia))
              .sort((a, b) => a.registerID - b.registerID);
          },


        onDeleteGuardia:(state)=>{
            if(state.activeGuardia){
                state.guardia=state.guardia.filter(guardias=>guardias.id !== state.activeGuardia.id);
                state.activeGuardia=null;
            }
        },



      
    }
});



export const { onLoadingGuardias,onSetActiveGuardia ,onUpdateGuardia,onDeleteGuardia} = guardiasSlice.actions;