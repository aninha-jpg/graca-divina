import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login/login';
import Panel from './pages/panel/panel';
import AdminRoute from "./adminRoute";
import Catalogo from "./pages/catalogo/catalogo";


const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/panel" element={ <AdminRoute> <Panel /> </AdminRoute> } />
                <Route path="/" element={<Catalogo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;