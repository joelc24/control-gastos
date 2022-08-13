import { useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import { ToastContainer} from 'react-toastify';
import ButtonReset from '../components/ButtonReset';

import ModalGasto from '../components/ModalGasto'
import ButtonAdd from '../components/ButtonAdd'
import { useControlGastoStore } from '../../hooks/useControlGastoStore';
import { formatearCantidad } from '../../helper/formatoMoneda';

const ControlPresupuesto = () => {

    const { presupuestoActive, gastoActive, gastos, updateGastDisp } = useControlGastoStore()
    const { presupuesto, disponible, gastado } = presupuestoActive
    const [porcentaje, setPorcentaje] = useState(0);
    const [opened, setOpened] = useState(false)

    const titleModal = gastoActive ? 'Editar Gasto' : "Añadir un nuevo gasto"

    useEffect(() => {

        const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad, 0)

        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto * 100).toFixed(2)

        updateGastDisp(totalGastado, totalDisponible)
        setTimeout(() => {
            
            setPorcentaje(nuevoPorcentaje)
        }, 1500);

    }, [gastos])

    return (
        <>
            <Box className="contenedor-presupuesto contenedor sombra dos-columnas">
                <Box>
                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                            trailColor: '#F5F5F5',
                            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                            
                        })}
                        value={porcentaje}
                        text={`${porcentaje}% Gastado`}
                    />
                </Box>
                <Box className="contenido-presupuesto">
                    <ButtonReset/>
                    <p>
                        <span>Presupuesto: {formatearCantidad(+presupuesto)}</span>
                    </p>
                    <p>
                        <span>Disponible: {formatearCantidad(+disponible)}</span>
                    </p>
                    <p>
                        <span>Gastado: {formatearCantidad(+gastado)}</span>
                    </p>
                </Box>
            </Box>
            <ModalGasto
                opened={opened}
                setOpened={setOpened}
                title={titleModal}
            />

            <ButtonAdd setOpened={setOpened} />
            <ToastContainer />
        </>
    );
}

export default ControlPresupuesto;
