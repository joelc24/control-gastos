import { useSelector, useDispatch } from "react-redux";
import { logoutFirebase, registerWithEmailPassword, signInWithEmailPassword } from "../firebase/provider";
import { notifyError } from "../helper/notify";
import { checkAuth, login, logout } from "../store/auth/authSlice";
import { cleanCategorias, cleanStore } from "../store/controlgastos/controlgastoSlice";
export const useAuthStore = () => {
    
    const { status } = useSelector((state)=> state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email,password}) => {
        dispatch( checkAuth() )
        const result = await signInWithEmailPassword({email,password})
        console.log(result)
        if( !result.ok ){
            
            dispatch( logout( result ) )
            notifyError('Credenciales Invalidas 🤔')
            return
        } 

        dispatch( login( result ) )
    }

    const startRegister = async({email,password,displayName}) => {

        dispatch( checkAuth() )

        const {ok, uid, photoURL, errorMessage } = await registerWithEmailPassword({email,password,displayName})
        
        if( !ok ) return dispatch( logout( {errorMessage} ) )

        dispatch( login({ uid, displayName, email, photoURL }) )

    }

    const startLogout = async () =>{
        await logoutFirebase()
        dispatch( cleanStore() )
        dispatch( cleanCategorias() )
        dispatch( logout() )

    }
    
    return {

        //* Propiedades *//
        status,

        //* Metodos *//
        startLogin,
        startRegister,
        startLogout
    }
}


