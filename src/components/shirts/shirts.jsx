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


const shirts = [
  {
    id: 1,
    nome: "T-shirt Nossa Senhora de Fátima",
    descricao: "Traz uma homenagem à Mãe que apareceu aos três pastorinhos e deixou uma mensagem de oração, conversão e confiança em Deus. Com a frase “Salve Maria”, a estampa expressa nosso amor e devoção a Nossa Senhora, lembrando-nos de recorrer sempre à sua intercessão e permanecer próximos de Jesus.",
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
  },
  {
    id: 4,
    nome: "T-shirt Nossa Senhora Aparecida",
    descricao: "Foi criada para carregar no dia a dia a presença daquela que nos aponta para Jesus e nos ensina a confiar, mesmo nos momentos difíceis. Uma peça para vestir não apenas no corpo, mas como expressão de fé, amor e devoção à Mãe Aparecida.",
    preco: 69.90,
    imagem: shirt4,
  },
  {
    id: 5,
    nome: "T-shirt Medalha Milagrosa",
    descricao: "A Medalha Milagrosa é um símbolo de fé, confiança e devoção a Nossa Senhora, lembrando-nos de sua presença materna e de sua constante intercessão junto a Deus. Traz essa devoção para o dia a dia, como um lembrete de que nunca estamos sozinhos e de que podemos sempre recorrer à proteção e ao amor de nossa Mãe.",
    preco: 69.90,
    imagem: shirt5,
  },
  {
    id: 6,
    nome: "T-shirt Teu olhar Jamais",
    descricao: "“O Teu olhar jamais se afastou de mim.” Uma estampa para lembrar que, mesmo nos momentos mais difíceis, o olhar de Maria permanece sobre nós",
    preco: 69.90,
    imagem: shirt6,
  },
  {
    id: 7,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt7,
  },
  {
    id: 8,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt8,
  },
  {
    id: 9,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt9,
  },
  {
    id: 10,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt10,
  },
  {
    id: 11,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt11,
  },
  {
    id: 12,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt12,
  },
  {
    id: 13,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt13,
  },
  {
    id: 14,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt14,
  },
  {
    id: 15,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt15,
  },
  {
    id: 16,
    nome: "T-shirt Nossa Senhora das Graças",
    descricao: "Uma camiseta para vestir a fé, carregar Maria no coração e lembrar todos os dias que nunca estamos sozinhos.",
    preco: 69.90,
    imagem: shirt16,
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