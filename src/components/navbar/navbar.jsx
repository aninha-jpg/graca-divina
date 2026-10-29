import { useState, useEffect, useRef } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import Logo from "../../assets/logo.jpeg";
import WhatsAppButton from "../../components/whatsAppButton/whatsAppButton";
import "./navbar.css";
import "../../styles/styles.css";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                setVisible(true);
            } else if (currentScrollY < lastScrollY.current) {

                setVisible(true);
            } else if (currentScrollY > lastScrollY.current) {

                setVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`navContainer ${visible ? "navVisible" : "navHidden"}`}
        >
            <div className="navBarDesktop">
                <div className="logo">
                    <a href="#home">
                        <img src={Logo} alt="Logo Graça Divina" />
                    </a>
                </div>

                <div className="navLinks">
                    <a href="#catalogo">Catálogo</a>
                    <a href="#about">Sobre</a>
                    <a href="#contact">Contato</a>
                    <WhatsAppButton texto="WhatsApp" />
                </div>
            </div>

            <div className="navBarMobile">
                <a href="#home" className="logo">
                    <img
                        className="heroImage"
                        src={Logo}
                        alt="Logo Divina Graça"
                    />
                </a>

                <Button
                    type="text"
                    aria-label="Abrir menu"
                    icon={<MenuOutlined />}
                    onClick={() => {
                        setVisible(true);
                        setOpen(true);
                    }}
                />

                <Drawer
                    title="Menu"
                    placement="right"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <nav className="mobileLinks">
                        <a href="#home" onClick={() => setOpen(false)}>
                            Início
                        </a>
                        <a href="#catalogo" onClick={() => setOpen(false)}>
                            Catálogo
                        </a>
                        <a href="#about" onClick={() => setOpen(false)}>
                            Sobre
                        </a>
                        <a href="#contact" onClick={() => setOpen(false)}>
                            Contato
                        </a>
                    </nav>
                </Drawer>
            </div>
        </nav>
    );
}

export default Navbar;