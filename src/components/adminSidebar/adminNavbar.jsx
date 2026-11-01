import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Drawer } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  ShoppingOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import Logo from "../../assets/logo.jpeg";
import "./adminNavbar.css";

function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fecharMenu = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      fecharMenu();
      navigate("/admin/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <header className="admin-navbar">
      <NavLink
        to="/admin/panel"
        className="admin-navbar-logo"
        onClick={fecharMenu}
      >
        <img src={Logo} alt="Graça Divina" />
      </NavLink>

      <Button
        type="text"
        className="admin-navbar-toggle"
        aria-label="Abrir menu administrativo"
        icon={<MenuOutlined />}
        onClick={() => setOpen(true)}
      />

      <Drawer
        title="Painel administrativo"
        placement="right"
        open={open}
        onClose={fecharMenu}
        className="admin-navbar-drawer"
      >
        <nav className="admin-navbar-links">
          <NavLink
            to="/admin/panel"
            end
            className="admin-navbar-link"
            onClick={fecharMenu}
          >
            <HomeOutlined />
            <span>Visão geral</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className="admin-navbar-link"
            onClick={fecharMenu}
          >
            <ShoppingOutlined />
            <span>Produtos</span>
          </NavLink>
        </nav>

        <button
          type="button"
          className="admin-navbar-logout"
          onClick={handleLogout}
        >
          <LogoutOutlined />
          <span>Sair</span>
        </button>
      </Drawer>
    </header>
  );
}

export default AdminNavbar;