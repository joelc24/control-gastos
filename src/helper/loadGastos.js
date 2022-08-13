import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"
import dayjs from 'dayjs'


export const loadGastos = async( uid = '' ) =>{
    if ( !uid ) throw new Error('El UID del Usuario no existe') 

    const collectionRef = collection( FirebaseDB, `${uid}/controlgasto/gastos` )

    const docs = await getDocs(collectionRef)
    const gastos = []
    const opcionesFecha = {
                            year: 'numeric',
                            month: 'numeric',
                            day: '2-digit',
                        }

    docs.forEach( (doc) => {
        const { seconds } = doc.data().fecha
        const fecha = dayjs.unix(seconds)
        gastos.push({ id: doc.id, ...doc.data(), fecha: new Date(fecha.$d).toLocaleDateString('en-En', opcionesFecha) })
    } )

    
    
    return gastos

}