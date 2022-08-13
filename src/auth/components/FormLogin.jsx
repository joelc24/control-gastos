import {
    Group,
    Button,
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { useAuthStore } from "../../hooks/useAuthStore";

import validaciones from '../helpers/loginvalidacion'

const FormLogin = () => {

    const { startLogin } = useAuthStore()

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            remenber: true,
        },

        validate: {
            email: (value) => validaciones.email(value),
            password: (value) => validaciones.password(value)
        },
    })

    const handleSubmit = ({email, password}) => {
        startLogin({ email, password })
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                label="Correo"
                placeholder="you@mantine.dev"
                required
                {...form.getInputProps('email')}
            />
            <PasswordInput
                label="Contraseña"
                placeholder="********"
                required
                mt="md"
                {...form.getInputProps('password')}
            />
            <Group position="apart" mt="md">
                <Checkbox
                    label="Recuerdame"
                    {...form.getInputProps('remenber', { type: 'checkbox' })}
                />
                <Anchor
                    onClick={(event) => event.preventDefault()}
                    href="#"
                    size="sm"
                >
                    olvidaste tu contraseña ?
                </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
                Iniciar sesion
            </Button>
        </form>
    );
}

export default FormLogin;
