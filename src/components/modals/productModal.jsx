import ProductForm from "../productForm/productForm";
import "./productModal.css";

function ProductModal({ onClose, produtoEdicao = null  }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <section
                className="product-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="modal-header">
                    <div>
                        <p className="panel-eyebrow">DIVINA GRAÇA</p>
                        <h2 id="modal-title">
                            {produtoEdicao ? "Editar produto" : "Novo produto"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Fechar modal"
                    >
                        ×
                    </button>
                </header>

                <p className="modal-description">
                    {produtoEdicao
                        ? "Altere as informações do produto." : "Preencha as informações para cadastrar um produto."}
                    </p>

                <ProductForm
                    onClose={onClose}
                    produtoEdicao={produtoEdicao}
                    />
            </section>
        </div>
    );
}

export default ProductModal;