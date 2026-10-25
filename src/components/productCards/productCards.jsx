import { useState } from "react";
import "./productCards.css";
import deleteProduct from "../hook/deleteProduct";
import ConfirmModal from "../confirmModal/confirmModal";

function ProductCards({ produto, onEditar }) {

    const [mostrarModal, setMostrarModal] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erroExclusao, setErroExclusao] = useState("");

   async function handleDelete() {
        try {
            setCarregando(true);
            setErroExclusao("");

            await deleteProduct(produto.id);

            setMostrarModal(false);
        } catch (erro) {
            console.error("Erro ao excluir produto:", erro);
            setErroExclusao("Não foi possível excluir o produto. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <article className="product-card">
            <h3>{produto.nome}</h3>

            <p>{produto.descricao}</p>

            <strong>
                {Number(produto.preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </strong>

            <div className="product-variations">
                {(produto.cores || []).map((cor, indiceCor) => (
                    <div key={`${produto.id}-cor-${indiceCor}`}>
                        <h4>{cor.nome}</h4>

                        {(cor.tamanhos || []).map((tamanho, indiceTamanho) => (
                            <p key={`${produto.id}-${indiceCor}-${indiceTamanho}`}>
                                Tamanho: {tamanho.nome.toUpperCase()} — Estoque:{" "}
                                {tamanho.quantidade}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            <button type="button" className="button-gen" onClick={() => onEditar(produto)} > Editar produto </button>

            <button type="button" className="button-gen" onClick={() => setMostrarModal(true)} > Excluir produto </button>
            {mostrarModal && (
                    <ConfirmModal
                        titulo="Excluir produto?"
                        mensagem={`Tem certeza de que deseja excluir "${produto.nome}"? Essa ação não poderá ser desfeita.`}
                        textoCancelar="Cancelar"
                        textoConfirmar="Sim, excluir"
                        onClose={() => {
                            setMostrarModal(false);
                            setErroExclusao("");
                        }}
                        onConfirm={handleDelete}
                        carregando={carregando}
                    />
                )}

                {erroExclusao && (
                    <p className="error-message" role="alert">
                        {erroExclusao}
                    </p>
                )}
        </article>
    );
}

export default ProductCards;