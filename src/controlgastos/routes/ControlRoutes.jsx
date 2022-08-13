import { Routes, Route, Navigate } from "react-router-dom";
import ControlGastos from "../pages/ControlGastos";
const ControlRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<ControlGastos />}/>

            <Route path="/*" element={<Navigate to="/"/>}/> 
        </Routes>
    );
}

export default ControlRoutes;
