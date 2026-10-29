import "./sizes.css";

function Sizes() {
  return (
    <section className="sizes">
      <div className="sizes-content">
        <h2>Encontre seu tamanho</h2>

        <p>
          Confira os tamanhos disponíveis e encontre a peça ideal para você.
        </p>

        <div className="sizes-list">
          <span>P</span>
          <span>M</span>
          <span>G</span>
          <span>GG</span>
          <span>G1</span>
        </div>

        <a
          href="https://wa.me/5543991135330?text=Oi%21%20Vim%20pelo%20site%20da%20Gra%C3%A7a%20Divina%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20pe%C3%A7as%20dispon%C3%ADveis%21"
          className="sizes-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}

export default Sizes;