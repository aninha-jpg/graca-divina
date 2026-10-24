import { useState } from "react";
import "./panel.css";
import ProductForm from "../../components/productForm/productForm";

function Panel() {
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <main className="panel-page">
            <header className="panel-header">
                <div>
                    <p className="panel-eyebrow">GRAÇA DIVINA</p>
                    <h1>Painel administrativo</h1>
                    <p className="panel-subtitle">
                        Gerencie seus produtos e estoque.
                    </p>
                </div>
            </header>

            <section className="panel-content">
                <h2>Visão geral</h2>

                <div className="panel-cards">
                    <article className="panel-card">
                        <span>Produtos cadastrados</span>
                        <strong>0</strong>
                    </article>

                    <article className="panel-card">
                        <span>Itens em estoque</span>
                        <strong>0</strong>
                    </article>
                </div>

                <section className="panel-products">
                    <div>
                        <h2>Seus produtos</h2>
                        <p>Cadastre e organize os produtos da loja.</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setModalAberto(true)}
                    >
                        + Novo produto
                    </button>
                </section>
            </section>

            {modalAberto && (
                <div
                    className="modal-overlay"
                    onClick={() => setModalAberto(false)}
                >
                    <section
                        className="product-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="modal-header">
                            <div>
                                <p className="panel-eyebrow">
                                    GRAÇA DIVINA
                                </p>

                                <h2 id="modal-title">Novo produto</h2>
                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setModalAberto(false)}
                                aria-label="Fechar modal"
                            >
                                ×
                            </button>
                        </header>

                        <p className="modal-description">
                            Preencha as informações para cadastrar um produto.
                        </p>

                        <ProductForm onClose={() => setModalAberto(false)} />
                    </section>
                </div>
            )}
        </main>
    );
}

export default Panel;