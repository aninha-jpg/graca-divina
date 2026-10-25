import ProductForm from "../productForm/productForm";
import "./productModal.css";

function ProductModal({ onClose }) {
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
                        <h2 id="modal-title">Novo produto</h2>
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
                    Preencha as informações para cadastrar um produto.
                </p>

                <ProductForm onClose={onClose} />
            </section>
        </div>
    );
}

export default ProductModal;