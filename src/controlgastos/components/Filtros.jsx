import { Box, Button, Group, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import PropTypes from 'prop-types'
import { useControlGastoStore } from '../../hooks/useControlGastoStore';
import validaciones from '../../helper/validacionFormGasto'
import { IconCategory } from '@tabler/icons';

const Filtros = ({ setFiltro }) => {

    const { categorias, gastos } = useControlGastoStore()
    
    const form = useForm({
        initialValues: {
            filtro: categorias
        }, 

        validate: {
            filtro: (value) => validaciones.categoria(value)
        }
    })

    const handleSubmit = ({filtro}) =>{

        setFiltro(filtro)
    }

    return (
        <Box className="filtros sombra contenedor">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select
                    label="Filtrar Gastos"
                    placeholder='Selecciona por la categoria a filtrar'
                    nothingFound="No hay opciones que coincidan"
                    variant='filled'
                    radius='md'
                    mt='md'
                    searchable
                    icon={<IconCategory/>}
                    data={['Todas', ...categorias]}
                    {...form.getInputProps('filtro')}
                />
                <Group position='center' mt='md'>
                    <Button type='submit'>
                        ENVIAR
                    </Button>
                </Group>
            </form>
        </Box>
    );
}



export default Filtros;
