import { createSlice } from '@reduxjs/toolkit';

export const ingresoSlice = createSlice({
  name: 'ingreso',
  initialState: {
    isBuscandoAlumno: false,
    alumnoDatos: [],
    alumnoRut: '',
    ingreso:[],
  },
  reducers: {
    onSearchingAlumno: (state) => {
      state.isBuscandoAlumno = true;
    },
    onAlumnoFound: (state, action) => {
      state.isBuscandoAlumno = false;
      state.alumnoDatos = action.payload;
      state.alumnoRut=action.payload.registerRut
    },
    onAlumnoNotFound: (state) => {
      state.isBuscandoAlumno = false;
      state.alumnoDatos = [];
      state.alumnoRut = ''
    },
    setAlumnoRut: (state, action) => {
      state.alumnoRut = action.payload;
    },

    onClearDatos:(state)=>{
      state.alumnoDatos=[];
      state.alumnoRut='';
      state.ingreso=[]
    },
    onLoadingIngresos:(state,{payload=[]})=>{
      state.isBuscandoAlumno=false;
      payload.forEach(ingreso=>{
        const exists=state.ingreso.some(dbIngreso=>dbIngreso.id===ingreso.id)
        if(!exists){
          state.ingreso.push(ingreso)
        }
      })
    }
  },
});

export const { onSearchingAlumno, onAlumnoFound, onAlumnoNotFound, setAlumnoRut,onLoadingIngresos,onClearDatos } = ingresoSlice.actions;