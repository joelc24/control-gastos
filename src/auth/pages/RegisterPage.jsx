import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import LayoutAuth from "../theme/LayoutAuth";
import FormRegister from "../components/FormRegister"
import { useCheckAuth } from "../../hooks";




const RegisterPage = () => {

    const navigate = useNavigate()
    const navegar = () => navigate("/auth/login/");
    const { status } = useCheckAuth()
   
    return (
        <LayoutAuth title='Ya tienes una cuenta?' titleLink='Iniciar sesion' navegar={navegar}>
            {
                (status === 'checking')
                    ?
                    (
                        <Loader color="indigo" size="xl" variant="bars" />
                    )
                    :
                    (

                        <FormRegister/>
                    )
            }
        </LayoutAuth>
    );
}

export default RegisterPage;
