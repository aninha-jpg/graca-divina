import "./productFields.css";

function ProductFields({
    nome,
    setNome,
    descricao,
    setDescricao,
    preco,
    setPreco,
    custo,
    setCusto
}) {
    return (
        <>
            <div className="form-group">
                <label htmlFor="nome">Nome do produto</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex.: Camiseta básica"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descreva o produto"
                    rows={3}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="custo">Custo do produto (R$)</label>
                <input
                    id="custo"
                    type="number"
                    min="0"
                    step="0.01"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                    placeholder="Ex.: 25.00"
                    required
                />
                <small>Quanto a loja pagou para adquirir o produto.</small>
            </div>

            <div className="form-group">
                <label htmlFor="preco">Preço de venda (R$)</label>
                <input
                    id="preco"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="Ex.: 59.90"
                    required
                />
            </div>
        </>
    );
}

export default ProductFields;