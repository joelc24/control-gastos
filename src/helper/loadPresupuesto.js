import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/firebaseConfig"


export const loadPresupuesto = async( uid = '' ) =>{
    if ( !uid ) throw new Error('El UID del Usuario no existe') 

    const collectionRef = collection( FirebaseDB, `${uid}/controlgasto/presupuesto` )

    const docs = await getDocs(collectionRef)
    const presupuesto = []
    docs.forEach( (doc) => {
        presupuesto.push({ id: doc.id, ...doc.data() })
    } )

    
    
    return presupuesto

}