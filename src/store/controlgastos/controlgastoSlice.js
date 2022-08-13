

import { createSlice } from '@reduxjs/toolkit';

export const controlgasto = createSlice({
    name: 'controlgasto',
    initialState: {
        isSaving: false,
        gastos: [],
        categorias: [],
        presupuestoActive: null,
        gastoActive: null
        /* 
        gasto: { 
            id: 'AS4545', 
            categoria: ahorro, 
            nombre: example, 
            cantidad: 2, 
            fecha 
        }
        
        */
    },
    reducers: {
        addNewGastos: (state, action) =>{
            state.gastos.push( action.payload )
            state.isSaving = false
        },
        setPresupuestoActive: (state, action) =>{
            state.presupuestoActive = action.payload
        },
        setGastos: (state, action)=>{
            state.gastos = action.payload
        },
        setCategorias: (state, {payload})=>{
            state.categorias = payload
        },
        setSaving: (state, action)=>{
            state.isSaving = action.payload
        },
        updateGastos: (state, action)=>{
            state.gastos = state.gastos.map(gasto => {
                if(gasto.id === action.payload.id){
                    return action.payload
                }

                return gasto
            })

        },
        cleanStore: (state) => {
            state.isSaving = false,
            state.gastos = [],
            state.presupuestoActive = null,
            state.gastoActive = null
        },
        cleanCategorias: (state)=>{
            state.categorias = []
        },
        setGastoActiveState: (state,action)=>{
            state.gastoActive = action.payload
        },
        clearGastoActiveState: (state)=>{
            state.gastoActive = null
        },
        deleteGastoById: (state, action)=>{
            state.gastoActive = null,
            state.gastos = state.gastos.filter(g => g.id !== action.payload)
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewGastos,
    setPresupuestoActive,
    setGastos,
    setCategorias,
    setSaving,
    updateGastos,
    cleanStore,
    cleanCategorias,
    setGastoActiveState,
    clearGastoActiveState,
    deleteGastoById
} = controlgasto.actions;