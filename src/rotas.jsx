import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login/login';
import Panel from './pages/panel/panel';
import AdminRoute from "./adminRoute";
import Catalogo from "./pages/catalogo/catalogo";
import Linktree from "./pages/linktree/linktree";
import Products from "./pages/products/products"


const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/panel" element={ <AdminRoute> <Panel /> </AdminRoute> } />
                <Route path="/admin/products" element={ <AdminRoute> <Products /> </AdminRoute> } />
                <Route path="/" element={<Catalogo />} />
                <Route path="/linktree" element={<Linktree />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;