import { Button, Checkbox, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuthStore } from "../../hooks";

import validaciones from "../helpers/registervalidacion";

const FormRegister = () => {

    const { startRegister } = useAuthStore()

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password2: '',
            termsOfService: true,
        },

        validate: {
            name: (value) => validaciones.name(value),
            email: (value) => validaciones.email(value),
            password: (value) => validaciones.password(value),
            password2: (value) => validarPassword2(value),
            termsOfService: (value) => validaciones.termsOfService(value)
        },
    })

    const validarPassword2 = (value) => {
        if (form.values.password == value) return null

        return 'Las contraseñas deben ser iguales'
    }

    const handleSubmit = (data) => {
        const { email, password, name } = data
        startRegister({
            email,
            password,
            displayName: name
        })
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label='Nombre'
                placeholder="Example"
                required
                {...form.getInputProps('name')}
            />
            <TextInput
                label='Correo'
                placeholder="jhondoe@correo.com"
                mt={6}
                required
                {...form.getInputProps('email')}
            />
            <PasswordInput
                label="Contraseña"
                placeholder="********"
                mt={6}
                required
                {...form.getInputProps('password')}
            />
            <PasswordInput
                label="Confirmar contraseña"
                placeholder="********"
                mt={6}
                required
                {...form.getInputProps('password2')}
            />
            <Checkbox
                label="Aceptar terminos y condiciones"
                mt={6}
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
            <Group position="center">
                <Button type="submit" fullWidth mt="xl">
                    Registrarse
                </Button>
            </Group>

        </form>
    );
}

export default FormRegister;
