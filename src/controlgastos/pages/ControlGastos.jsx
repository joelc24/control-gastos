import { useState } from "react";
import ControlPresupuesto from "../views/ControlPresupuesto";
import NuevoPresupuesto from "../views/NuevoPresupuesto";

import './ControlGastos.css'
import { useControlGastoStore } from "../../hooks/useControlGastoStore";
import LayoutControlGastos from "../theme/LayoutControlGastos";
import Filtros from "../components/Filtros";
import ListadoGastos from "../components/ListadoGastos";

const ControlGastos = () => {

    const { presupuestoActive } = useControlGastoStore()
    const [filtro, setFiltro] = useState('')

    
    return (
        <>
            <LayoutControlGastos>
                {
                    (!!presupuestoActive)
                        ?
                        (
                            <ControlPresupuesto />

                        )
                        :
                        (
                            <NuevoPresupuesto />
                        )
                }

            </LayoutControlGastos>
            {
                (!!presupuestoActive) && (

                    <main>
                        <Filtros setFiltro={setFiltro} />
                        <ListadoGastos filtro={filtro} />
                    </main>
                )
            }
        </>
    );
}

export default ControlGastos;
