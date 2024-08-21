import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        status:'not-authenticated',
        user:{},
        errorMessage:undefined
    },
    reducers:{
        onChecking:(state)=>{
            state.status='checking';
            state.user={};
            state.errorMessage=undefined;
        },
        onLogin:(state,{payload})=>{
            state.status='authenticated';
            state.user=payload;
            state.errorMessage=undefined;
        },
        onLogout:(state,{payload})=>{
            state.status='not-authenticated';
            state.user={};
            state.errorMessage=payload;
        },
        clearErrorMessage:(state)=>{
            state.errorMessage=undefined;
        },
        onLoginAdmin:(state,{payload})=>{
            state.status='admin';
            state.user=payload;
            state.errorMessage=undefined;
        },

    }
})

export const { onLoginAdmin,onChecking,onLogin,onLogout ,clearErrorMessage} = authSlice.actions;