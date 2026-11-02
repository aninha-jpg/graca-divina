import { ShoppingOutlined } from "@ant-design/icons";
import "./confirmSaleModal.css";

function ConfirmSaleModal({
  produto,
  nomeCor,
  nomeTamanho,
  onCancel,
  onUpdateStock,
  onRegisterSale,
  loading = false,
}) {
  if (!produto) return null;

  const formatarMoeda = (valor) =>
    Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div
      className="confirm-sale-overlay"
      onMouseDown={(evento) => {
        if (
          evento.target === evento.currentTarget &&
          !loading
        ) {
          onCancel();
        }
      }}
    >
      <section
        className="confirm-sale-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-sale-title"
        aria-describedby="confirm-sale-description"
      >
        <button
          type="button"
          className="confirm-sale-close"
          onClick={onCancel}
          disabled={loading}
          aria-label="Fechar janela"
        >
          ×
        </button>

        <div className="confirm-sale-icon">
          <ShoppingOutlined />
        </div>

        <h2 id="confirm-sale-title">
          Registrar saída de estoque?
        </h2>

        <p
          className="confirm-sale-description"
          id="confirm-sale-description"
        >
          Você está diminuindo uma peça do estoque.
        </p>

        <div className="confirm-sale-product">
          <span className="confirm-sale-product-name">
            {produto.nome}
          </span>

          <span>
            Cor: <strong>{nomeCor}</strong>
          </span>

          <span>
            Tamanho: <strong>{nomeTamanho}</strong>
          </span>

          <div className="confirm-sale-price">
            <span>Valor unitário</span>
            <strong>{formatarMoeda(produto.preco)}</strong>
          </div>
        </div>

        <p className="confirm-sale-question">
          Deseja registrar essa saída como uma venda no
          financeiro?
        </p>

        <div className="confirm-sale-actions">
          <button
            type="button"
            className="confirm-sale-button primary"
            onClick={onRegisterSale}
            disabled={loading}
          >
            {loading ? "Processando..." : "Sim, registrar venda"}
          </button>

          <button
            type="button"
            className="confirm-sale-button secondary"
            onClick={onUpdateStock}
            disabled={loading}
          >
            Apenas atualizar estoque
          </button>

          <button
            type="button"
            className="confirm-sale-button cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmSaleModal;