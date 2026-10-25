import "./confirmModal.css";

function ConfirmModal({
    titulo,
    mensagem,
    textoCancelar = "Cancelar",
    textoConfirmar = "Confirmar",
    onClose,
    onConfirm,
    carregando = false
}) {
    return (
        <div className="confirm-modal-overlay" onClick={onClose}>
            <section
                className="confirm-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="confirm-modal-title">{titulo}</h2>

                <p>{mensagem}</p>

                <div className="confirm-modal-actions">
                    <button
                        type="button"
                        className="confirm-modal-cancel"
                        onClick={onClose}
                        disabled={carregando}
                    >
                        {textoCancelar}
                    </button>

                    <button
                        type="button"
                        className="confirm-modal-submit"
                        onClick={onConfirm}
                        disabled={carregando}
                    >
                        {carregando ? "Aguarde..." : textoConfirmar}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ConfirmModal;