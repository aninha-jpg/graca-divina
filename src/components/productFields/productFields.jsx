import "./productFields.css";

function ProductFields({ nome, setNome, descricao, setDescricao, preco, setPreco
}) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="nome">Nome do produto</label>
        <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Camiseta básica" required
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição</label>
        <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descreva o produto" rows={3} required
        />
      </div>

      <div className="form-group">
        <label htmlFor="preco">Preço (R$)</label>
        <input id="preco" type="number" min="0.01" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Ex.: 59.90" required
        />
      </div>
    </>
  );
}

export default ProductFields;
