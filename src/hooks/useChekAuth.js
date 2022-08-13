import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/firebaseConfig";
import { loadGastos } from "../helper/loadGastos";
import { loadPresupuesto } from "../helper/loadPresupuesto";
import { login, logout } from "../store/auth/authSlice";
import { useControlGastoStore } from "./useControlGastoStore";


export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { addPresupuestoActive, loadCategorias, startSaveGastos } = useControlGastoStore()

    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async( user )=> {
            if( !user ) return  dispatch( logout() )
            const { uid, email, displayName, photoURL } = user
            dispatch(login({ uid, email, displayName, photoURL }) )
            await loadCategorias()
            const [presupuesto] = await loadPresupuesto(uid)
            /* console.log(presupuesto) */
            const gastos = await loadGastos(uid)
            startSaveGastos(gastos)
            addPresupuestoActive(presupuesto)
        } )
        
    }, []);

    return {
        status
        
    }
}