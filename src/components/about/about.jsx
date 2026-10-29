import { useState, useEffect } from "react";
import { InstagramOutlined } from "@ant-design/icons";
import "./about.css";

import foto1 from "../../assets/foto-proprietaria1.jpeg";

const proprietarias = [
    {
        id: 1,
        nome: "Giovana Rocha",
        descricao: "Descrição da primeira proprietária.",
        imagem: foto1,
        instagram: "https://www.instagram.com/a_giovanalima/?hl=pt",
    },
    {
        id: 2,
        nome: "Deborah Lima",
        descricao: "Descrição da segunda proprietária.",
        imagem: null,
        instagram: "https://www.instagram.com/deeh_ellem/?hl=pt",
    },
];

function About() {
    const [indice, setIndice] = useState(0);

    function proximo() {
        setIndice((atual) => (atual + 1) % proprietarias.length);
    }

    function anterior() {
        setIndice(
            (atual) =>
                (atual - 1 + proprietarias.length) % proprietarias.length
        );
    }

    useEffect(() => {
        const intervalo = setInterval(proximo, 7000);

        return () => clearInterval(intervalo);
    }, []);

    const proprietaria = proprietarias[indice];

    return (
        <section className="about" id="about">
            <div className="about-header">
                <h2>Nossa história</h2>
                <p>Conheça quem faz parte da Graça Divina.</p>
            </div>

            <div className="about-carousel" key={proprietaria.id}>
                <div className="about-image">
                    {proprietaria.imagem ? (
                        <img
                            src={proprietaria.imagem}
                            alt={proprietaria.nome}
                        />
                    ) : (
                        <span>Foto em breve</span>
                    )}
                </div>

                <div className="about-content">
                    <span className="about-number">
                        0{indice + 1} / 0{proprietarias.length}
                    </span>

                    <h3>{proprietaria.nome}</h3>

                    <p>{proprietaria.descricao}</p>

                   <a href={proprietaria.instagram} className="about-instagram" target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${proprietaria.nome}`}>
                        <InstagramOutlined /> Conheça meu Instagram</a>

                    <div className="about-controls">
                        <button type="button" onClick={anterior} aria-label="Proprietária anterior"
                        >
                            &#8592;
                        </button>

                        <button type="button" onClick={proximo} aria-label="Próxima proprietária"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;