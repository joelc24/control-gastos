import PropTypes from 'prop-types'
import { Box } from "@mantine/core";
import GastoItem from './GastoItem';
import { filtroGastos } from '../../helper/filtroGastos';
import { useControlGastoStore } from '../../hooks/useControlGastoStore';


const ListadoGastos = ({filtro}) => {

    const { gastos } = useControlGastoStore()

    const gastosFiltrados = filtroGastos(filtro, gastos)

    return (
        <Box className='listado-gastos contenedor'>
            {
                gastosFiltrados.map(gasto=>(
                    <GastoItem
                       key={gasto.id}
                       gasto={gasto} 
                    />
                ))
            }
        </Box>
    );
}


export default ListadoGastos;
