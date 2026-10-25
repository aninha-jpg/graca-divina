import "./productVariations.css";

function ProductVariations({ cores, atualizarCor, adicionarCor, removerCor, atualizarTamanho, adicionarTamanho, removerTamanho
}) {
  return (
    <section className="variacoes">
      <h3>Variações e estoque</h3>
      <p>Informe as cores, os tamanhos e a quantidade de cada opção.</p>

      {cores.map((cor, indiceCor) => (
        <div className="cor-card" key={indiceCor}>
          <div className="form-group">
            <label htmlFor={`cor-${indiceCor}`}>
              Cor {indiceCor + 1}
            </label>

            <input id={`cor-${indiceCor}`} type="text" value={cor.nome} onChange={(e) =>   atualizarCor(indiceCor, e.target.value) } placeholder="Ex.: Branca" required
            />

            <button type="button" className="button-remove" onClick={() => removerCor(indiceCor)}> Remover Cor </button>
          </div>

          {cor.tamanhos.map((tamanho, indiceTamanho) => (
            <div
              className="tamanho-row"
              key={indiceTamanho}
            >
              <div className="form-group">
                <label htmlFor={`tamanho-${indiceCor}-${indiceTamanho}`}>
                  Tamanho
                </label>

                <select id={`tamanho-${indiceCor}-${indiceTamanho}`} value={tamanho.nome} onChange={(e) =>   atualizarTamanho(indiceCor, indiceTamanho,     "nome", e.target.value)
                } required >
                  <option value="">Selecione o tamanho</option>
                  <option value="PP">PP</option>
                  <option value="P">P</option>
                  <option value="M">M</option>
                  <option value="G">G</option>
                  <option value="GG">GG</option>
                  <option value="XG">XG</option>
                  <option value="G1">G1</option>
                  <option value="G2">G2</option>
                  <option value="G3">G3</option>
                </select>

                <button type="button" className="button-remove" onClick={() =>   removerTamanho(indiceCor, indiceTamanho) } aria-label={`Remover tamanho ${tamanho.nome || ""}`}
                >
                  Remover
                </button>
              </div>

              <div className="form-group">
                <label htmlFor={`quantidade-${indiceCor}-${indiceTamanho}`}>
                  Quantidade
                </label>

                <input id={`quantidade-${indiceCor}-${indiceTamanho}`} type="number" min="0" step="1" value={tamanho.quantidade} onChange={(e) =>   atualizarTamanho(     indiceCor,     indiceTamanho,     "quantidade",     e.target.value   ) } required
                />
              </div>
            </div>
          ))}

          <button type="button" className="button-secondary" onClick={() => adicionarTamanho(indiceCor)}
          >
            + Adicionar tamanho
          </button>
        </div>
      ))}

      <button type="button" className="button-secondary" onClick={adicionarCor}
      >
        + Adicionar cor
      </button>
    </section>
  );
}

export default ProductVariations;