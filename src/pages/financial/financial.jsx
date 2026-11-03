import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import AdminNavbar from "../../components/adminSidebar/adminNavbar";
import SaleForm from "../../components/saleForm/saleForm";
import FinancialSummary from "../../components/financialSummary/financialSummary";
import SalesHistory from "../../components/salesHistory/salesHistory";

import useFinancial from "../../components/hook/useFinancial";

import "./financial.css";

function Financial() {
  const {
    produtos,
    vendas,
    produtoId,
    corSelecionada,
    tamanhoSelecionado,
    quantidade,
    valorUnitario,
    carregando,
    salvando,
    erro,
    mensagem,
    produtoSelecionado,
    corAtual,
    estoqueDisponivel,
    totalVenda,
    vendasDoMes,
    faturamentoMes,
    faturamentoTotal,
    pecasVendidas,
    lucroBrutoMes,
    custosCompletos,
    selecionarProduto,
    selecionarCor,
    setTamanhoSelecionado,
    setQuantidade,
    setValorUnitario,
    registrarVenda,
  } = useFinancial();

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(timestamp) {
    if (!timestamp?.toDate) {
      return "Processando...";
    }

    return timestamp.toDate().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  return (
    <main className="financial-page">
      <AdminNavbar />
      <AdminSidebar />

      <div className="financial-main">
        <section className="financial-content">
          <header className="financial-header">
            <div>
              <h1>Financeiro</h1>

              <p>
                Registre as vendas e acompanhe o faturamento
                da Graça Divina.
              </p>
            </div>
          </header>

          <FinancialSummary
            faturamentoMes={faturamentoMes}
            faturamentoTotal={faturamentoTotal}
            vendasDoMes={vendasDoMes}
            pecasVendidas={pecasVendidas}
            lucroBrutoMes={lucroBrutoMes}
            custosCompletos={custosCompletos}
            formatarMoeda={formatarMoeda}
          />

          <SaleForm
            produtos={produtos}
            produtoId={produtoId}
            selecionarProduto={selecionarProduto}
            produtoSelecionado={produtoSelecionado}
            corSelecionada={corSelecionada}
            selecionarCor={selecionarCor}
            corAtual={corAtual}
            tamanhoSelecionado={tamanhoSelecionado}
            setTamanhoSelecionado={setTamanhoSelecionado}
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            valorUnitario={valorUnitario}
            setValorUnitario={setValorUnitario}
            estoqueDisponivel={estoqueDisponivel}
            totalVenda={totalVenda}
            formatarMoeda={formatarMoeda}
            erro={erro}
            mensagem={mensagem}
            salvando={salvando}
            carregando={carregando}
            registrarVenda={registrarVenda}
          />

          <SalesHistory
            vendas={vendas}
            formatarData={formatarData}
            formatarMoeda={formatarMoeda}
          />
        </section>
      </div>
    </main>
  );
}

export default Financial;