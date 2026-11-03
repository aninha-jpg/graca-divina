import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import AdminRoute from "./adminRoute";

const Login = lazy(() => import("./pages/login/login"));
const Panel = lazy(() => import("./pages/panel/panel"));
const Catalogo = lazy(() => import("./pages/catalogo/catalogo"));
const Linktree = lazy(() => import("./pages/linktree/linktree"));
const Products = lazy(() => import("./pages/products/products"));
const Financial = lazy(() => import("./pages/financial/financial"));
const NotFound = lazy(() => import("./components/notFound/notFound"));

const Rotas = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Carregando...</div>}>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/admin/login" element={<Login />} />

                    <Route path="/admin/panel" element={<AdminRoute><Panel /></AdminRoute>}/>

                    <Route path="/admin/products" element={ <AdminRoute> <Products /> </AdminRoute>}/>

                    <Route path="/admin/financial" element={<AdminRoute> <Financial /> </AdminRoute>}/>

                    <Route path="/" element={<Catalogo />} /> <Route path="/links" element={<Linktree />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Rotas;