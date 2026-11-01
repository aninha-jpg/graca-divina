import "./linktree.css";
import {
  InstagramOutlined,
  WhatsAppOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import Logo from "../../assets/logo.jpeg";


function Linktree() {
  const links = [
    {
      icon: <ShoppingOutlined />,
      title: "Conheça nossa coleção",
      subtitle: "Encontre sua próxima peça favorita",
      url: "https://SEU-SITE-AQUI.web.app",
    },
    {
        icon: <WhatsAppOutlined />,
        title: "Fale conosco",
        subtitle: "Estamos esperando por você",
        url: `https://wa.me/5543991135330?text=${encodeURIComponent(
            "Oi! Vim pelo Instagram da Graça Divina e gostaria de saber mais sobre os produtos."
        )}`,
    },
    {
      icon: <InstagramOutlined />,
      title: "Acompanhe nosso Instagram",
      subtitle: "Novidades, looks e inspirações",
      url: "https://www.instagram.com/use.gracadivina/?hl=pt",
    },
  ];

  return (
    <main className="linktree-page">
      <div className="linktree-container">
        <header className="linktree-header">
          <div className="linktree-logo">
             <img src={Logo} alt="Logo Graça Divina" />
          </div>

          <h1>Graça Divina</h1>

          <p className="linktree-category">MODA FEMININA</p>

          <div className="linktree-divider">
            <span />
            <span />
          </div>

          <p className="linktree-description">
            Fé que inspira, amor que transforma.
          </p>
        </header>

        <nav className="linktree-links" aria-label="Links da loja">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="linktree-button"
            >
              <span className="linktree-icon">{link.icon}</span>

              <span className="linktree-button-text">
                <strong>{link.title}</strong>
                <small>{link.subtitle}</small>
              </span>

              <span className="linktree-arrow">↗</span>
            </a>
          ))}
        </nav>

        <footer className="linktree-footer">
          <span>GRAÇA DIVINA</span>
          <p>Feito com carinho para você.</p>
        </footer>
      </div>
    </main>
  );
}

export default Linktree;