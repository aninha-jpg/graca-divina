import "./panelSummary.css";

function PanelSummary({ totalProdutos, totalEstoque, carregando }) {
    return (
        <section className="panel-summary">
            <h2>Visão geral</h2>

            <div className="panel-cards">
                <article className="panel-card">
                    <span>Produtos cadastrados</span>
                    <strong>
                        {carregando ? "..." : totalProdutos}
                    </strong>
                </article>

                <article className="panel-card">
                    <span>Itens em estoque</span>
                    <strong>
                        {carregando ? "..." : totalEstoque}
                    </strong>
                </article>
            </div>
        </section>
    );
}

export default PanelSummary;