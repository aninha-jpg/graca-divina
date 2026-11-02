import "./salesHistory.css";

function SalesHistory({ vendas, formatarData, formatarMoeda }) {
  return (
    <section className="financial-panel">
      <div className="financial-section-header">
        <div>
          <h2>Histórico de vendas</h2>
          <p>Consulte os registros realizados na loja.</p>
        </div>
      </div>

      {vendas.length === 0 ? (
        <p className="financial-empty">
          Nenhuma venda registrada ainda.
        </p>
      ) : (
        <div className="financial-table-wrapper">
          <table className="financial-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Variação</th>
                <th>Qtd.</th>
                <th>Unitário</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id}>
                  <td>{formatarData(venda.criadoEm)}</td>

                  <td>{venda.produtoNome}</td>

                  <td>
                    {venda.cor} / {venda.tamanho}
                  </td>

                  <td>{venda.quantidade}</td>

                  <td>{formatarMoeda(venda.valorUnitario)}</td>

                  <td className="financial-table-total">
                    {formatarMoeda(venda.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default SalesHistory;