import "./productFilter.css";

function ProductFilters({
    busca,
    setBusca,
    corSelecionada,
    setCorSelecionada,
    tamanhoSelecionado,
    setTamanhoSelecionado,
    coresDisponiveis,
    tamanhosDisponiveis,
    aplicarFiltros,
    limparFiltros
}) {
    function limparFiltros() {
        setBusca("");
        setCorSelecionada("");
        setTamanhoSelecionado("");
    }

    return (
        <section className="product-filters">
            <div className="filter-search">
                <label htmlFor="busca-produto">
                    Buscar produto
                </label>

                <input id="busca-produto" type="search" placeholder="Digite o nome do produto..." value={busca} onChange={(evento) => setBusca(evento.target.value)} />
            </div>

            <div className="filter-field">
                <label htmlFor="filtro-cor">Cor</label>

                <select id="filtro-cor" value={corSelecionada} onChange={(evento) =>
                    setCorSelecionada(evento.target.value)
                    } >
                    <option value="">Todas as cores</option>

                    {coresDisponiveis.map((cor) => (
                        <option key={cor} value={cor}>
                            {cor}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-field">
                <label htmlFor="filtro-tamanho">Tamanho</label>

                <select id="filtro-tamanho" value={tamanhoSelecionado} onChange={(evento) => setTamanhoSelecionado(evento.target.value)
                } >
                    <option value="">Todos os tamanhos</option>

                    {tamanhosDisponiveis.map((tamanho) => (
                        <option key={tamanho} value={tamanho}>
                            {tamanho}
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="filter" onClick={limparFiltros} > Limpar filtros </button>

            <button type="button" className="filter" onClick={aplicarFiltros} >Filtrar</button>

        </section>
    );
}

export default ProductFilters;
