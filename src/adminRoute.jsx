import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { LoadingOutlined } from "@ant-design/icons";
import "./pages/login/login.css";

function AdminRoute({ children }) {
    const [status, setStatus] = useState("carregando");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setStatus("nao-autenticado");
                return;
            }

            try {
                const usuarioRef = doc(db, "usuario", user.uid);
                const usuarioDoc = await getDoc(usuarioRef);

                if (
                    usuarioDoc.exists() &&
                    usuarioDoc.data().role === "admin"
                ) {
                    setStatus("admin");
                } else {
                    setStatus("sem-permissao");
                }
            } catch (error) {
                console.error("Erro ao verificar usuário:", error);
                setStatus("erro");
            }
        });

        return unsubscribe;
    }, []);

    if (status === "carregando") {
        return (
            <div className="login-page">
                <div className="login-card">
                    <LoadingOutlined spin />
                </div>
            </div>
        );
    }

    if (status === "nao-autenticado") {
        return <Navigate to="/admin/login" replace />;
    }

    if (status === "sem-permissao" || status === "erro") {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default AdminRoute;