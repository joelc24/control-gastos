import { Box } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setSaving } from "../../store/controlgastos/controlgastoSlice";
import IconoNuevoGasto from '/img/nuevo-gasto.svg'
const ButtonAdd = () => {

    const dispatch = useDispatch()

    return (
        <Box className="nuevo-gasto">
            <img
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={()=> dispatch( setSaving(true) )}
            />
        </Box>
    );
}



export default ButtonAdd;
