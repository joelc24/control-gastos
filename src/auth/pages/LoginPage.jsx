import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import LayoutAuth from "../theme/LayoutAuth";
import FormLogin from "../components/FormLogin";
import { useCheckAuth } from "../../hooks";
import { ToastContainer, } from "react-toastify";


const LoginPage = () => {

    const navigate = useNavigate()
    const navegar = () => navigate("/auth/register/");

    const { status } = useCheckAuth()


    return (
        <>
            <LayoutAuth title='No tienes una cuenta?' titleLink='Crear cuenta' navegar={navegar}>
                {
                    (status === 'checking')
                    ?
                    (
                        <Loader color="indigo" size="xl" variant="bars" />
                    )
                    :
                    (

                        <FormLogin />
                    )
                }

            </LayoutAuth>
            <ToastContainer/>
        </>
    );
}

export default LoginPage;
