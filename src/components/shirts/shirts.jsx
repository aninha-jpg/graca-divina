import { useState } from "react";
import ShirtDetailsModal from "../../components/shirtDetailsModal/shirtDetailsModal";
import "./shirts.css";

import shirt1 from "../../assets/shirts/shirt1.jpeg";
import shirt2 from "../../assets/shirts/shirt2.jpeg";
import shirt3 from "../../assets/shirts/shirt3.jpeg";
import shirt4 from "../../assets/shirts/shirt4.jpeg";
import shirt5 from "../../assets/shirts/shirt5.jpeg";
import shirt6 from "../../assets/shirts/shirt6.jpeg";
import shirt7 from "../../assets/shirts/shirt7.jpeg";
import shirt8 from "../../assets/shirts/shirt8.jpeg";
import shirt9 from "../../assets/shirts/shirt9.jpeg";
import shirt10 from "../../assets/shirts/shirt10.jpeg";
import shirt11 from "../../assets/shirts/shirt11.jpeg";
import shirt12 from "../../assets/shirts/shirt12.jpeg";
import shirt13 from "../../assets/shirts/shirt13.jpeg";
import shirt14 from "../../assets/shirts/shirt14.jpeg";
import shirt15 from "../../assets/shirts/shirt15.jpeg";
import shirt16 from "../../assets/shirts/shirt16.jpeg";
import shirt17 from "../../assets/shirts/shirt17.jpeg";


const shirts = [
  {
    id: 1,
    nome: "T-shirt Santa Teresinha do Menino Jesus",
    descricao: "Uma estampa delicada e cheia de significado, com Santa Teresinha do Menino Jesus em destaque, rodeada por rosas que remetem à sua história e devoção. Uma peça inspirada na fé, no amor e na beleza dos pequenos gestos.",
    preco: 69.90,
    imagem: shirt1,
  },
  {
    id: 2,
    nome: "T-shirt São Miguel Arcanjo ",
    descricao: "A Quaresma de São Miguel Arcanjo é um tempo especial de oração, penitência e busca por uma vida mais próxima de Deus. Uma peça para vestir não apenas no corpo, mas também como expressão da sua fé e devoção a São Miguel Arcanjo.",
    preco: 69.90,
    imagem: shirt2,
  },
  {
    id: 3,
    nome: "T-shirt Sagrada Família",
    descricao: "A Sagrada Família nos ensina que o amor, a união e a fé são os alicerces de um lar verdadeiramente guiado por Deus. Um convite para levar no coração e também vestir no dia a dia o exemplo de Jesus, Maria e José.",
    preco: 69.90,
    imagem: shirt3,
    imagemVerso: shirt9,
  },
  {
    id: 4,
    nome: "T-shirt São José e Menino Jesus",
    descricao: "Estampa de São José acolhendo o Menino Jesus em seus braços, representando o amor, o cuidado e a proteção paterna. Uma peça que transmite fé, ternura e devoção à Sagrada Família.",
    preco: 69.90,
    imagem: shirt4,
  },
  {
    id: 5,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma estampa delicada de Nossa Senhora das Graças, com seu manto azul e uma composição de flores aos seus pés. Uma peça que transmite fé, proteção e devoção, perfeita para levar consigo uma mensagem de amor e esperança.",
    preco: 69.90,
    imagem: shirt5,
  },
  {
    id: 6,
    nome: "T-shirt Medalha Milagrosa",
    descricao: "A Medalha Milagrosa é um símbolo de fé, confiança e devoção a Nossa Senhora, lembrando-nos de sua presença materna e de sua constante intercessão junto a Deus. Traz essa devoção para o dia a dia, como um lembrete de que nunca estamos sozinhos e de que podemos sempre recorrer à proteção e ao amor de nossa Mãe. Uma peça para vestir não apenas no corpo, mas também como expressão da sua fé, confiança e amor por Nossa Senhora.",
    preco: 69.90,
    imagem: shirt6,
  },
  {
    id: 7,
    nome: "T-shirt Totus Tuus Maria",
    descricao: "“Totus Tuus Maria” significa “Todo teu, Maria”, uma expressão de entrega, amor e consagração a Nossa Senhora, eternizada por São João Paulo II. Uma frase que representa a confiança e a devoção de quem escolhe caminhar sob o manto de Maria.",
    preco: 69.90,
    imagem: shirt7,
  },
  {
    id: 8,
    nome: "T-shirt Nossa Senhora Aparecida ",
    descricao: "Outubro é um mês ainda mais especial para nós, brasileiros, quando celebramos com amor e devoção Nossa Senhora Aparecida, nossa Padroeira. T-shirt Nossa Senhora Aparecida é uma peça para levar ao dia a dia a presença daquela que nos conduz a Jesus e nos ensina a confiar, mesmo diante das dificuldades. Vai além de vestir: é uma expressão de fé, amor e devoção à Mãe Aparecida.",
    preco: 69.90,
    imagem: shirt8,
  },
  {
    id: 9,
    nome: "T-shirt A Cruz Sagrada Seja a Minha Luz",
    descricao: "Inspirada na poderosa oração de São Bento, esta T-shirt carrega uma mensagem de fé, proteção e confiança em Deus. “A Cruz Sagrada seja a minha luz” é uma expressão de entrega e devoção, que nos lembra da presença divina e da força da fé em todos os momentos.",
    preco: 69.90,
    imagem: shirt10,
  },
  {
    id: 10,
    nome: "T-shirt Nossa Senhora Aparecida",
    descricao: "Uma estampa dedicada a Nossa Senhora Aparecida, que representa acolhimento, proteção e amor materno. Uma lembrança de que, nos momentos de alegria ou dificuldade, podemos encontrar em Maria um colo de mãe e um caminho de fé que nos conduz a Jesus.",
    preco: 69.90,
    imagem: shirt11,
  },
  {
    id: 11,
    nome: "T-shirt Nossa Senhora Aparecida",
    descricao: "Uma estampa marcante de Nossa Senhora Aparecida, em destaque sobre um lindo fundo azul que contrasta com a camiseta preta. Uma composição que une beleza e devoção, celebrando o amor e a proteção da Mãe Aparecida. Uma peça para expressar sua fé com personalidade e carinho.",
    preco: 69.90,
    imagem: shirt12,
  },
  {
    id: 12,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Estampa de Nossa Senhora das Graças, uma representação de fé, amor e proteção materna. Uma peça que expressa a devoção a Maria e nos recorda que nunca estamos sozinhos em nossa caminhada.",
    preco: 69.90,
    imagem: shirt13,
  },
  {
    id: 13,
    nome: "T-shirt Nossa Senhora Aparecida",
    descricao: "Estampa de Nossa Senhora Aparecida em destaque, uma representação delicada de fé, amor e devoção à Mãe de Jesus. Vista e leve Nossa Senhora Aparecida sempre com você!",
    preco: 69.90,
    imagem: shirt14,
  },
  {
    id: 14,
    nome: "T-shirt Nossa Senhora Aparecida",
    descricao: "Acompanhada da oração: “Querida mãe, Nossa Senhora, ilumine os meus passos e fazei de mim digna de sua amorosa proteção.” Uma peça que transmite fé, carinho e devoção materna.",
    preco: 69.90,
    imagem: shirt15,
  },
  {
    id: 15,
    nome: "T-shirt Teu Olhar Jamais",
    descricao: "Estampa de Nossa Senhora com os braços abertos, acompanhada da frase 'O teu olhar jamais se afastou de mim', inspirada em Lucas 1:28. Uma mensagem de amor, cuidado e proteção materna.",
    preco: 69.90,
    imagem: shirt16,
  },
  {
    id: 16,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma peça delicada e cheia de significado, com a imagem de Nossa Senhora das Graças em destaque, acompanhada da oração “Maria concebida sem pecado, rogai por nós que recorremos a vós”. A ilustração em tons de preto e cinza, combinada à escrita em estilo manuscrito, traz um visual clássico e elegante. Uma camiseta que expressa fé e devoção, perfeita para carregar uma mensagem especial em todos os momentos.",
    preco: 69.90,
    imagem: shirt17,
  },
];

function Shirts() {
  const [selectedShirt, setSelectedShirt] = useState(null);

  return (
    <main className="shirtsPage">

      <section className="shirtsCatalog" id="catalogo">
        <div className="shirtsCatalogHeader">
          <div>
            <span className="shirtsSubtitle">
              ESCOLHIDAS PARA VOCÊ
            </span>

            <h2>Nosso catálogo</h2>
          </div>
        </div>

        <div className="shirtsGrid">
          {shirts.map((shirt) => (
            <article className="shirtCard" key={shirt.id}>
              <div className="shirtImagePlaceholder">
                <img src={shirt.imagem} alt={shirt.nome} />
              </div>

              <div className="shirtInfo">
                <h3>{shirt.nome}</h3>
                <p className="shirtPrice">
                  R$ {shirt.preco.toFixed(2).replace(".", ",")}
                </p>

                <button
                  type="button"
                  className="shirtInterestButton"
                  onClick={() => setSelectedShirt(shirt)}
                >
                  Ver detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ShirtDetailsModal
        shirt={selectedShirt}
        onClose={() => setSelectedShirt(null)}
      />
    </main>
  );
}

export default Shirts;