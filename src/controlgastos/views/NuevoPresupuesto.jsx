import { Text, TextInput, Box, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useControlGastoStore } from "../../hooks/useControlGastoStore";

const NuevoPresupuesto = () => {

    const { startNewPresupuesto } = useControlGastoStore()

    const form = useForm({
        initialValues: {
            presupuesto: 1_000
        },

        validate: {
            presupuesto: (value) => {
                if((+value) <= 0){
                    return 'Presupuesto no valido'
                }

                return null
            }
        }
    })

    const handleSubmit = ({presupuesto}) =>{
        startNewPresupuesto(presupuesto)
    }

    return (
        <Box className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={form.onSubmit(handleSubmit)}>
                <div className="campo">
                    <Text 
                        component="label"
                        sx={(theme) => ({
                            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                            fontWeight: 900
                        })}
                    >
                        Definir Presupuesto
                    </Text>
                    <NumberInput
                        placeholder="Añade Tu Presupuesto"
                        size="xl"
                        variant="filled"
                        radius="md"
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        formatter={(value) =>
                            !Number.isNaN(parseFloat(value))
                                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : '$ '
                        }
                        {...form.getInputProps('presupuesto')}
                    />
                </div>
                <input type="submit" value="Añadir" />
            </form>
        </Box>
    );
}

export default NuevoPresupuesto;
