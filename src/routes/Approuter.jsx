import { Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from '../auth/routes/AuthRoutes'
import ControlRoutes from "../controlgastos/routes/ControlRoutes";
import { useCheckAuth } from "../hooks/useChekAuth";
const Approuter = () => {

    const { status } = useCheckAuth()    


    return (
        <Routes>
            {
                (status !== 'autenticado') ?
                <Route path="/auth/*" element={<AuthRoutes/>}/>
                : <Route path="/*" element={<ControlRoutes/>}/>
                    
                
            }
            <Route path='/*' element={<Navigate to='/auth/login' />} />
        </Routes>
    );
}

export default Approuter;
