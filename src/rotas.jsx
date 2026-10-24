import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login/login';
import Panel from './pages/panel/panel';
import AdminRoute from "./adminRoute";


const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/panel" element={ <AdminRoute> <Panel /> </AdminRoute> } />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;