import swal from "sweetalert";
import { useControlGastoStore } from "../../hooks/useControlGastoStore";
import { notifyInfo } from "../../helper/notify";
import { useAuthStore } from "../../hooks/useAuthStore";


const ButtonReset = () => {

    const { handleResetApp } = useControlGastoStore()
    const { startLogout } = useAuthStore()

    const onResetApp = () => {
        swal({
            title: "Esta seguro?",
            text: "¿Deseas Borrar Todos Los Datos?",
            icon: "warning",
            buttons: ['Cancelar', 'OK'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    handleResetApp()
                } 
            });
    }

    const desicion = () => {
        swal({
            title: "Que desea hacer?",
            text: "Cerrar sesion o borrar todo!",
            icon: "info",
            buttons: {
                salir: {
                    text: "Cerrar Sesion",
                    value: "salir"
                },
                borrar: {
                    text: "Borrar Todo",
                    value: "borrar"
                }
            }
        })
            .then((value) => {
                switch (value) {

                    case "salir":
                        startLogout()
                        break;

                    case "borrar":
                        onResetApp()
                        break;

                    default:
                        notifyInfo('Operacion Cancelada')
                }
            });
    }

    return (
        
        <button
            className="reset-app"
            type="button"
            onClick={desicion}
        >
            Reset App / Logout
        </button>
        
    );
}

export default ButtonReset;
