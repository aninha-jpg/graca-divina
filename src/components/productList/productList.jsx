import ProductCards from "../productCards/productCards";
import "./productList.css";

function ProductList({ produtos, carregando, erro, onEditar  }) {
    return (
        <section className="products-list">
            <h2>Produtos cadastrados</h2>

            {carregando && <p>Carregando produtos...</p>}

            {erro && <p role="alert">{erro}</p>}

            {!carregando && !erro && produtos.length === 0 && (
                <p>Nenhum produto cadastrado ainda.</p>
            )}

            {!carregando && !erro && produtos.length > 0 && (
                <div className="products-grid">
                    {produtos.map((produto) => (
                        <ProductCards key={produto.id} produto={produto} onEditar={onEditar}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProductList;