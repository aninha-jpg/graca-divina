import { useState, useEffect } from "react";
import "./shirtDetailsModal.css";

function ShirtDetailsModal({ shirt, onClose }) {
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    setImagemAtual(0);
  }, [shirt]);

  if (!shirt) return null;

  const imagens = [shirt.imagem, shirt.imagemVerso].filter(Boolean);

  const telefone =
    shirt.id <= 8 ? "5543991135330" : "5543996213920";

  const mensagem = `Olá! Tenho interesse na ${shirt.nome}. Poderiam me informar os tamanhos disponíveis?`;

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  function imagemAnterior() {
    setImagemAtual((atual) =>
      atual === 0 ? imagens.length - 1 : atual - 1
    );
  }

  function proximaImagem() {
    setImagemAtual((atual) =>
      atual === imagens.length - 1 ? 0 : atual + 1
    );
  }

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
          <img
            src={imagens[imagemAtual]}
            alt={`${shirt.nome} - ${imagemAtual === 0 ? "Frente" : "Verso"}`}
          />

          {imagens.length > 1 && (
            <>
              <button
                type="button"
                className="shirtCarouselArrow shirtCarouselPrev"
                onClick={imagemAnterior}
                aria-label="Imagem anterior"
              >
                &#10094;
              </button>

              <button
                type="button"
                className="shirtCarouselArrow shirtCarouselNext"
                onClick={proximaImagem}
                aria-label="Próxima imagem"
              >
                &#10095;
              </button>

              <div className="shirtCarouselIndicators">
                {imagens.map((imagem, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`shirtCarouselDot ${
                      imagemAtual === index ? "active" : ""
                    }`}
                    onClick={() => setImagemAtual(index)}
                    aria-label={`Ver imagem ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="shirtModalInfo">
          <span className="shirtModalSubtitle">GRAÇA DIVINA</span>

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
          >
            Tenho interesse
          </button>
        </div>
      </section>
    </div>
  );
}

export default ShirtDetailsModal;