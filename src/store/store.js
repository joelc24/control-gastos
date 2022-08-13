import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { controlgasto } from './controlgastos/controlgastoSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    controlgasto: controlgasto.reducer
  },
})