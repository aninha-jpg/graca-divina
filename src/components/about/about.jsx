import { useState, useEffect } from "react";
import { InstagramOutlined } from "@ant-design/icons";
import "./about.css";

import foto1 from "../../assets/foto-proprietaria1.jpeg";
import foto2 from "../../assets/foto-proprietaria2.jpeg";

const proprietarias = [
    {
        id: 1,
        nome: "Giovana Rocha",
        descricao: "Eu já conhecia o desejo da minha irmã Deborah de empreender e sabia o quanto aquele sonho era especial para ela. Quando surgiu a ideia de criar a Graça Divina, senti que poderia fazer parte daquela história, não apenas oferecendo meu apoio, mas também me permitindo sonhar junto. Sabia que começar sozinha poderia ser um desafio, então decidi convidá-la para darmos esse passo juntas. Unimos nossas ideias, nossa disposição e, principalmente, nossa fé para tirar aquele projeto do papel. Assim, o que começou como o sonho de uma irmã se tornou um propósito compartilhado por duas. Hoje, tenho a alegria de construir esse caminho ao lado dela, aprendendo, crescendo e colocando amor em cada detalhe da Graça Divina.",
        imagem: foto1,
        instagram: "https://www.instagram.com/a_giovanalima/?hl=pt",
    },
    {
        id: 2,
        nome: "Deborah Lima",
        descricao: "Decidi dar uma chance ao sonho de empreender, buscando também uma forma de viver a maternidade mais de perto, estar presente na vida da minha filha e, ao mesmo tempo, realizar algo que sempre desejei. Em oração, pedi a Deus uma confirmação. Pela intercessão de Santa Rita de Cássia, recebi uma rosa, que interpretei como um sinal de que aquele pedido tão especial, guardado em meu coração, estava sendo acolhido. No começo, confesso que me senti um pouco perdida. Eu tinha o sonho, mas ainda não sabia exatamente por onde começar ou qual caminho seguir. Foi então que minha irmã Giovana trouxe uma ideia: por que não criar uma loja de T-shirts católicas? E assim, unimos nossos sonhos, nossas ideias, nossa fé e os contatos que já tínhamos. O que antes era apenas um desejo começou a ganhar forma. Foi assim que nasceu a Graça Divina: uma marca que carrega muito mais do que roupas. Carrega fé, amor, propósito e a certeza de que Deus conduz cada passo quando colocamos nossos sonhos em Suas mãos. Hoje, somos duas irmãs, Giovana e Deborah, dando vida a esse sonho com o coração cheio de gratidão e esperança. Um sonho que nasceu da fé e floresceu pela graça de Deus.",
        imagem: foto2,
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
        const intervalo = setInterval(proximo, 25000);

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