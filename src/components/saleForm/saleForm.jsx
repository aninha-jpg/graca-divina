import "./saleForm.css";

function SaleForm({
  produtos,
  produtoId,
  selecionarProduto,
  produtoSelecionado,
  corSelecionada,
  selecionarCor,
  corAtual,
  tamanhoSelecionado,
  setTamanhoSelecionado,
  quantidade,
  setQuantidade,
  valorUnitario,
  setValorUnitario,
  estoqueDisponivel,
  totalVenda,
  formatarMoeda,
  erro,
  mensagem,
  salvando,
  carregando,
  registrarVenda,
}) {
  return (
    <section className="financial-panel">
      <div className="financial-section-header">
        <div>
          <h2>Registrar venda</h2>
          <p>
            Selecione o produto e informe os dados da venda.
          </p>
        </div>
      </div>

      <form className="financial-form" onSubmit={registrarVenda}>
        <div className="financial-field">
          <label htmlFor="produto">Produto</label>

          <select
            id="produto"
            value={produtoId}
            onChange={(event) =>
              selecionarProduto(event.target.value)
            }
            required
          >
            <option value="">Selecione um produto</option>

            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.codigo
                ? `${produto.codigo} — ${produto.nome}`
                : produto.nome}
            </option>
            ))}
          </select>
        </div>

        <div className="financial-form-grid">
          <div className="financial-field">
            <label htmlFor="cor">Cor</label>

            <select
              id="cor"
              value={corSelecionada}
              onChange={(event) =>
                selecionarCor(event.target.value)
              }
              disabled={!produtoSelecionado}
              required
            >
              <option value="">Selecione uma cor</option>

              {(produtoSelecionado?.cores ?? []).map(
                (cor, index) => (
                  <option
                    key={`${cor.nome}-${index}`}
                    value={cor.nome}
                  >
                    {cor.nome}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="financial-field">
            <label htmlFor="tamanho">Tamanho</label>

            <select
              id="tamanho"
              value={tamanhoSelecionado}
              onChange={(event) =>
                setTamanhoSelecionado(event.target.value)
              }
              disabled={!corAtual}
              required
            >
              <option value="">Selecione um tamanho</option>

              {(corAtual?.tamanhos ?? []).map(
                (tamanho, index) => (
                  <option
                    key={`${tamanho.nome}-${index}`}
                    value={tamanho.nome}
                  >
                    {tamanho.nome} — Estoque:{" "}
                    {tamanho.quantidade}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="financial-field">
            <label htmlFor="quantidade">Quantidade</label>

            <input
              id="quantidade"
              type="number"
              min="1"
              step="1"
              max={estoqueDisponivel}
              value={quantidade}
              onChange={(event) =>
                setQuantidade(event.target.value)
              }
              required
            />

            <small>
              Disponível: {estoqueDisponivel} peça(s)
            </small>
          </div>

          <div className="financial-field">
            <label htmlFor="valorUnitario">
              Valor unitário (R$)
            </label>

            <input
              id="valorUnitario"
              type="number"
              min="0.01"
              step="0.01"
              value={valorUnitario}
              onChange={(event) =>
                setValorUnitario(event.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="financial-total">
          <span>Total da venda</span>
          <strong>{formatarMoeda(totalVenda)}</strong>
        </div>

        {erro && (
          <p
            className="financial-message error"
            role="alert"
          >
            {erro}
          </p>
        )}

        {mensagem && (
          <p
            className="financial-message success"
            role="status"
          >
            {mensagem}
          </p>
        )}

        <button
          type="submit"
          className="financial-submit"
          disabled={salvando || carregando}
        >
          {salvando
            ? "Registrando..."
            : "Confirmar venda"}
        </button>
      </form>
    </section>
  );
}

export default SaleForm;