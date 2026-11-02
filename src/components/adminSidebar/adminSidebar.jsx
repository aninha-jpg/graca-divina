import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingOutlined,
  DollarOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import "./adminSidebar.css";

function AdminSidebar() {
  const [recolhida, setRecolhida] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <aside className={`admin-sidebar ${recolhida ? "recolhida" : ""}`}>
      <div className="admin-sidebar-top">
        {!recolhida && (
          <div className="admin-sidebar-brand">
            <h2>Graça Divina</h2>
            <span>Painel administrativo</span>
          </div>
        )}

        <button type="button" className="sidebar-toggle" onClick={() => setRecolhida(!recolhida)} aria-label={recolhida ? "Expandir menu" : "Recolher menu"}
        >
          {recolhida ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <nav className="admin-sidebar-nav">
        <NavLink to="/admin/panel" end className="admin-sidebar-link">
          <HomeOutlined />
          {!recolhida && <span>Visão geral</span>}
        </NavLink>

        <NavLink to="/admin/products" className="admin-sidebar-link">
          <ShoppingOutlined />
          {!recolhida && <span>Produtos</span>}
        </NavLink>

        <NavLink to="/admin/financial" className="admin-sidebar-link">
          <DollarOutlined/>
          {!recolhida && <span>Financeiro</span>}
        </NavLink>
      </nav>

      <button
        type="button"
        className="admin-sidebar-logout"
        onClick={handleLogout}
        aria-label="Sair"
      >
        <LogoutOutlined />
        {!recolhida && <span>Sair</span>}
      </button>
    </aside>
  );
}

export default AdminSidebar;