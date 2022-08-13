import { useDispatch } from "react-redux";
import { Select, TextInput, NumberInput, Group, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar, IconCategory, IconNotes, IconTag, IconDna2 } from "@tabler/icons";
import { toast } from "react-toastify";
import dayjs from 'dayjs';

import { useControlGastoStore } from "../../hooks/useControlGastoStore";
import { setSaving } from "../../store/controlgastos/controlgastoSlice";
import validaciones from "../../helper/validacionFormGasto";



const FormGasto = () => {

    const { categorias, startSaveGasto, gastoActive, updateGasto } = useControlGastoStore()
    const dispatch = useDispatch()

    const form = useForm({
        initialValues: {
            id: gastoActive?.id ?? '',
            nombre: gastoActive?.nombre ?? '',
            cantidad: gastoActive?.cantidad ??  1_000,
            fecha: gastoActive?.fecha ? new Date(gastoActive?.fecha) : new Date(),
            categoria: gastoActive?.categoria ?? categorias
        },

        validate:{
            nombre: (value)=> validaciones.nombre(value),
            cantidad: (value)=> validaciones.cantidad(value),
            fecha: (value)=> validaciones.fecha(value),
            categoria: (value)=> validaciones.categoria(value)
        }
    })

    const handleSubmit = (data)=>{
        dispatch( setSaving(false) )
        //*  Actualizando *//
        if(data.id){
            toast.promise(
                updateGasto(data),
                {
                    pending: 'Apctualizando Gasto',
                    success: 'Gasto Actualizado 👌',
                    error: 'ERROR !!🤯'
                }
            )
            
        }
        //*  Creando  *//
        if(data.id == ''){
            toast.promise(
                startSaveGasto(data),
                {
                    pending: 'Guardando Gasto',
                    success: 'Gasto Guardado 👌',
                    error: 'ERROR !!🤯'
                }
            )
        }


    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            {
                (gastoActive?.id)
                &&
                (
                    <TextInput
                        label="Id Gasto"
                        variant="filled"
                        radius="md"
                        disabled
                        icon={<IconDna2 />}
                        {...form.getInputProps('id')}
                    />
                ) 

            }
            
            <TextInput
                label="Nombre Gasto"
                placeholder="Añade el nombre del gasto"
                variant="filled"
                radius="md"
                required
                icon={<IconNotes/>}
                {...form.getInputProps('nombre')}
            />
            <NumberInput
                label="Cantidad"
                description="Añade la cantidad del gasto: ej 300"
                variant="filled"
                radius="md"
                mt="md"
                required
                icon={<IconTag size={16}/>}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value))
                        ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '$ '
                }
                {...form.getInputProps('cantidad')}
            />
            <DatePicker
                label="Fecha"
                placeholder="selecciona una fecha"
                variant="filled"
                radius="md"
                mt="md"
                required
                icon={<IconCalendar size={16} />}
                minDate={dayjs(new Date()).startOf('month').toDate()}
                maxDate={dayjs(new Date()).endOf('month').toDate()}
                {...form.getInputProps('fecha')}
            />
            <Select
                label="Categoria"
                placeholder="Seleccione una categoria del gasto"
                variant="filled"
                radius="md"
                mt="md"
                nothingFound="No hay opciones que coincidan"
                searchable
                required
                icon={<IconCategory size={16}/>}
                data={categorias}
                {...form.getInputProps('categoria')}
            />
            <Group position="center" mt="md">
                <Button type="submit" fullWidth>
                    Guardar
                </Button>
            </Group>
        </form>
    );
}

export default FormGasto;
