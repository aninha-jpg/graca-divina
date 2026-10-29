import "./footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-brand">
                <h2>Graça Divina</h2>
                <p className="footer-category">Moda Feminina</p>
                <p className="footer-description">
                    Fé que inspira, amor que transforma.
                </p>
            </div>

            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} Graça Divina.
                    Todos os direitos reservados.
                </p>
            </div>
            <p className="developer-credit">
                Desenvolvido por{" "}
                <a href="https://aninha-jpg.github.io/portfolio/" target="_blank" rel="noopener noreferrer" >
                    Ana Lu
                </a>
            </p>
        </footer>
    );
}

export default Footer;