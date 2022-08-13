import { Box, Image } from "@mantine/core";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import { toast } from "react-toastify";

import { useControlGastoStore } from "../../hooks/useControlGastoStore";

import IconoAhooro from '/img/icono_ahorro.svg'
import IconoCasa from '/img/icono_casa.svg'
import IconoComida from '/img/icono_comida.svg'
import IconoGastos from '/img/icono_gastos.svg'
import IconoOcio from '/img/icono_ocio.svg'
import IconoSalud from '/img/icono_salud.svg'
import IconoSuscripciones from '/img/icono_suscripciones.svg'

import 'react-swipeable-list/dist/styles.css'

import { formatearCantidad } from "../../helper/formatoMoneda";
import { formatearFecha } from "../../helper/formatoFecha";

const diccionarioIconos = {
    ahorro: IconoAhooro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const GastoItem = ({gasto}) => {
    
    const { categoria, nombre, cantidad, id, fecha } = gasto
    const { deleteGasto, startEditGasto } = useControlGastoStore()

    const handleDelete = (id) => {
        swal({
            title: "Esta seguro?",
            text: "¿Deseas Borrar Todos Los Datos del Gasto?",
            icon: "warning",
            buttons: ['Cancelar', 'OK'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    toast.promise(
                        deleteGasto(id),
                        {
                            pending: 'Borrando Gasto',
                            success: 'Gasto Borrado 👌',
                            error: 'ERROR !!🤯'
                        }
                    )
                }
            });
    }
    

    const leadingActions =()=> (
        <LeadingActions>
            <SwipeAction onClick={() => startEditGasto(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = ()=> (
        <TrailingActions>
            <SwipeAction onClick={() => handleDelete(id)}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <Box className="gasto sombra">
                    <Box className="contenido-gasto">
                        <Image
                            src={diccionarioIconos[categoria]}
                            alt='Icono Gasto'
                            width={100}
                        />
                        <Box className="descripcion-gasto">
                            <p className="categoria">
                                {categoria}
                            </p>
                            <p className="nombre-gasto">
                                {nombre}
                            </p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatearFecha(fecha)}</span>
                            </p>

                        </Box>
                        <p className="cantidad-gasto">
                            {formatearCantidad(cantidad)}
                        </p>
                    </Box>
                </Box>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default GastoItem;
