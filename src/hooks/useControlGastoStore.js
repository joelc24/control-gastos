import { useSelector, useDispatch } from "react-redux";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/firebaseConfig";
import { addNewGastos, cleanStore, deleteGastoById, setCategorias, setGastoActiveState, setGastos, setPresupuestoActive, setSaving, updateGastos } from "../store/controlgastos/controlgastoSlice";
import { formatearFecha } from "../helper/formatoFecha";

export const useControlGastoStore = ()=>{

    const { uid }  = useSelector(state => state.auth) 
    const { presupuestoActive, categorias, gastos, isSaving, gastoActive } = useSelector(state => state.controlgasto)
    const dispatch = useDispatch()

    const loadCategorias = async() =>{
        const dataCategorias = ['ahorro','comida','casa','gastos','ocio','salud','suscripciones']

        dispatch( setCategorias(dataCategorias) )

        setTimeout(() => {
            return { ok: 'listo' }
        }, 100);
    }

    const startNewPresupuesto = async(presupuesto)=>{

        const newPreupuesto ={
            presupuesto,
            disponible: presupuesto,
            gastado: 0 
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/controlgasto/presupuesto` ) )
        await setDoc( newDoc, newPreupuesto )

        newPreupuesto.id = newDoc.id
        dispatch( setPresupuestoActive( newPreupuesto ) )

    }

    const addPresupuestoActive = (presupuesto) =>{
        dispatch( setPresupuestoActive(presupuesto) )
    }

    const startSaveGasto = async(gasto) =>{
        delete gasto.id
        //console.log(gasto)
        const docRef = doc( collection( FirebaseDB, `${uid}/controlgasto/gastos` ) )
        await setDoc( docRef, gasto)
        const fecha = new Date(gasto.fecha).toLocaleDateString('en-En')
        console.log(fecha)
        dispatch( addNewGastos({...gasto, fecha, id: docRef.id }) )

    }

    const startSaveGastos = (gastos)=>{

        dispatch( setGastos(gastos) )
    }

    const startEditGasto = (gasto)=>{
        dispatch( setSaving(true) )
        dispatch( setGastoActiveState(gasto) )
    }
    
    const updateGasto = async(gasto)=>{
        const gastoToFireStore = {...gasto}

        delete gastoToFireStore.id

        const docRef = doc( FirebaseDB, `${uid}/controlgasto/gastos/${gasto.id}` )

        await setDoc( docRef, gastoToFireStore, { merge: true } )

        dispatch( updateGastos( {...gasto, fecha: new Date(gasto.fecha).toLocaleDateString('en-En')} ) )

    }

    const deleteGasto = async(id)=>{
        const docRef = doc( FirebaseDB, `${uid}/controlgasto/gastos/${id}` )
        await deleteDoc( docRef )

        dispatch( deleteGastoById(id) )
    }

    const updateGastDisp = async(gasto, disponible)=>{
        const presupuestoToFireStroe = {...presupuestoActive, gastado: gasto, disponible}

        delete presupuestoToFireStroe.id

        const docRef = doc( FirebaseDB, `${uid}/controlgasto/presupuesto/${presupuestoActive.id}` )
        await setDoc( docRef, presupuestoToFireStroe, { merge: true } )

        dispatch( setPresupuestoActive({ ...presupuestoActive, gastado: gasto, disponible }) )  
    }

    const handleResetApp = async()=>{
        const docPresupuestoRef = doc( FirebaseDB, `${uid}/controlgasto/presupuesto/${presupuestoActive.id}` )
        await deleteDoc( docPresupuestoRef )
        const allGastos = []
        for (const gasto of gastos) {
            const gastoRef = doc( FirebaseDB, `${uid}/controlgasto/gastos/${gasto.id}` )

            allGastos.push( deleteDoc(gastoRef) )
        }

        await Promise.all( allGastos )
        // docGastosRef = doc( FirebaseDB, `${uid}/controlgasto/gastos` )
        dispatch( cleanStore() )
    }


    return {
        //*PROPIEDADES*//
        presupuestoActive,
        categorias,
        gastos,
        isSaving,
        gastoActive,

        //*METODOS*//
        loadCategorias,
        startNewPresupuesto,
        addPresupuestoActive,
        startSaveGasto,
        startSaveGastos,
        startEditGasto,
        updateGasto,
        deleteGasto,
        updateGastDisp,
        handleResetApp
    }


}