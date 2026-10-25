import { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import Logo from "../../assets/logo.jpeg";
import WhatsAppButton from "../../components/whatsAppButton/whatsAppButton";
import "./navbar.css";
import "../../styles/styles.css";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="Navcontainer">
      <div className="navBarDesktop">
        <div className="logo">
          <a href="#home">
            <img src={Logo} alt="Logo Graça Divina" />
          </a>
        </div>

        <div className="navLinks">
          <a href="#services">Serviços</a>
          <a href="#products">Produtos</a>
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
          
          <WhatsAppButton texto="  WhatsApp"/>
        </div>
      </div>

      <div className="navBarMobile">
        <a href="#home" className="logo">
          <img className="heroImage" src={Logo} alt="Logo Bicicletaria Rocha" />
        </a>

        <Button
          type="text"
          aria-label="Abrir menu"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />

        <Drawer
          title="Menu"
          placement="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          <nav className="mobileLinks">
            <a href="#home" onClick={() => setOpen(false)}>Início</a>
            <a href="#services" onClick={() => setOpen(false)}>Serviços</a>
            <a href="#products" onClick={() => setOpen(false)}>Produtos</a>
            <a href="#about" onClick={() => setOpen(false)}>Sobre</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contato</a>
          </nav>
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
