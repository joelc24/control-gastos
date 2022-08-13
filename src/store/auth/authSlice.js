import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        photoUrl: null,
        displayName: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, {payload} ) => {
            state.status = 'autenticado';
            state.uid = payload.uid;
            state.email = payload.email;
            state.photoUrl = payload.photoUrl;
            state.displayName = payload.displayName;
            state.errorMessage = null;
        },
        logout: (state, {payload} ) => {
            state.status = 'no-autenticado';
            state.uid = null;
            state.email = null;
            state.photoUrl = null;
            state.displayName = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkAuth: (state) => {
            state.status = 'checking'
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkAuth } = authSlice.actions;