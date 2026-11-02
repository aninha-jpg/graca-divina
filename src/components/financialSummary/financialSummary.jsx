import "./financialSummary.css";

function FinancialSummary({
  faturamentoMes,
  vendasDoMes,
  pecasVendidas,
  lucroBrutoMes,
  custosCompletos,
  formatarMoeda,
}) {
  return (
    <section className="financial-summary">
      <article className="financial-card">
        <span>Faturamento do mês</span>
        <strong>{formatarMoeda(faturamentoMes)}</strong>
      </article>

      <article className="financial-card">
        <span>Lucro bruto do mês</span>

        <strong>
          {custosCompletos && lucroBrutoMes !== null
            ? formatarMoeda(lucroBrutoMes)
            : "Indisponível"}
        </strong>

        {!custosCompletos && (
          <small>
            Não há informações de custo para todas as vendas do mês.
          </small>
        )}
      </article>

      <article className="financial-card">
        <span>Vendas realizadas</span>
        <strong>{vendasDoMes.length}</strong>
      </article>

      <article className="financial-card">
        <span>Peças vendidas</span>
        <strong>{pecasVendidas}</strong>
      </article>
    </section>
  );
}

export default FinancialSummary;