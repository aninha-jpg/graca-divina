import "./sizeOrder.css";

function SizesOrder() {
  const message = encodeURIComponent(
    "Oi! Vim pelo site da Graça Divina e gostaria de saber mais sobre as peças infantis e masculinas sob encomenda!"
  );

  return (
    <section className="sizes-order">
      <div className="sizes-order-content">
        <h2>A mesma essência, diversas gerações</h2>

        <p>
            Descubra nossas opções de moda infantil e masculina.
            Consulte modelos e tamanhos disponíveis sob encomenda.
        </p>

        <div className="sizes-order-list">
          <span>Infantil</span>
          <span>Masculino</span>
        </div>

        <p className="sizes-order-note">
          * Peças disponíveis sob encomenda.
        </p>

        <a
          href={`https://wa.me/5543991135330?text=${message}`}
          className="sizes-order-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}

export default SizesOrder;