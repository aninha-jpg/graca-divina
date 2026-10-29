import banner from "../../assets/banner.jpeg";
import "./cta.css";

function Cta() {
    return (
        <section id="home"
            className="cta"
            style={{ "--cta-banner": `url(${banner})` }}
        >
            <div className="cta-content">
                <h2>Vista-se com Graça</h2>

                <p>
                    Conforto, qualidade e estilo para acompanhar você em todos os momentos.
                </p>

                <a href="#catalogo" className="cta-button">
                    Explorar catálogo
                </a>
            </div>
        </section>
    );
}

export default Cta;