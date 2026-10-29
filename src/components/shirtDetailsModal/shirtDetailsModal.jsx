import "./shirtDetailsModal.css";

function ShirtDetailsModal({ shirt, onClose }) {
  if (!shirt) return null;

  const telefone =
    shirt.id <= 8 ? "5543991135330" : "5543996213920";

    const mensagem = `Olá! Tenho interesse na ${shirt.nome}. Poderiam me informar os tamanhos disponíveis?`;

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  return (
    <div className="shirtModalOverlay" onClick={onClose}>
      <section
        className="shirtModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shirtModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="shirtModalClose"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          &times;
        </button>

        <div className="shirtModalImage">
          <div className="shirtModalImage">
              <img src={shirt.imagem} alt={shirt.nome} />
          </div>
        </div>

        <div className="shirtModalInfo">
          <span className="shirtModalSubtitle">DIVINA GRAÇA</span>

          <h2 id="shirtModalTitle">{shirt.nome}</h2>

          <p className="shirtModalDescription">
            {shirt.descricao ||
              "Confira esta peça especial da nossa coleção."}
          </p>

          <p className="shirtStock">
            Consulte a disponibilidade pelo WhatsApp.
          </p>

          <button
              type="button"
              className="shirtModalInterest"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
          > Tenho interesse </button>
        </div>
      </section>
    </div>
  );
}

export default ShirtDetailsModal;