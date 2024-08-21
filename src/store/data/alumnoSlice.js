import { createSlice } from '@reduxjs/toolkit';

export const alumnoSlice = createSlice({
    name: 'alumno',
    initialState: {
        isLoadingALumnos:true,
        alumno:[],
        activeAlumno:null,
        
    },
    reducers: {
        onLoadingAlumnos: (state,{payload=[]} ) => {
            state.isLoadingALumnos=false;
            payload.forEach(alumno=>{
                const exists=state.alumno.some(dbAlumno=>dbAlumno.id===alumno.id)
                if(!exists){
                    state.alumno.push(alumno)
                    
                }
            });
            state.alumno.sort((a, b) => a.registerID - b.registerID);
        },  
        onSetActiveAlumno:(state,{payload})=>{
            state.activeAlumno=payload;
        },


        onDeleteAlumno:(state)=>{
            if(state.activeAlumno){
                state.alumno=state.alumno.filter(alumnos=>alumnos.id !== state.activeAlumno.id);
                state.activeAlumno=null;
            }
        },
        onUpdateAlumno: (state, { payload }) => {
            state.alumno = state.alumno
              .map(alumno => (alumno.id === payload.id ? payload : alumno))
              .sort((a, b) => a.registerID - b.registerID);
          }



    }
});



export const { onLoadingAlumnos,onDeleteAlumno ,onSetActiveAlumno,onUpdateAlumno} = alumnoSlice.actions;