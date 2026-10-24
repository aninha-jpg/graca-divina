import { useState } from "react";
import "./productForm.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

function ProductForm({ onClose }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [cores, setCores] = useState([
        { nome: "", tamanhos: [{ nome: "", quantidade: 0 }] }
    ]);

    function atualizarCor(index, valor) {
        setCores((atuais) =>
            atuais.map((cor, i) =>
                i === index ? { ...cor, nome: valor } : cor
            )
        );
    }

    function adicionarCor() {
        setCores((atuais) => [
            ...atuais,
            { nome: "", tamanhos: [{ nome: "", quantidade: 0 }] }
        ]);
    }

    function atualizarTamanho(indiceCor, indiceTamanho, campo, valor) {
        setCores((atuais) =>
            atuais.map((cor, i) => {
                if (i !== indiceCor) return cor;

                return {
                    ...cor,
                    tamanhos: cor.tamanhos.map((tamanho, j) =>
                        j === indiceTamanho
                            ? { ...tamanho, [campo]: valor }
                            : tamanho
                    )
                };
            })
        );
    }

    function adicionarTamanho(indiceCor) {
        setCores((atuais) =>
            atuais.map((cor, i) =>
                i === indiceCor
                    ? {
                        ...cor,
                        tamanhos: [
                            ...cor.tamanhos,
                            { nome: "", quantidade: 0 }
                        ]
                    }
                    : cor
            )
        );
    }

    async function handleSubmit(event) {
    event.preventDefault();

    if (!nome.trim() || !descricao.trim() || !preco) {
        alert("Preencha todos os campos.");
        return;
    }

    if (Number(preco) <= 0 || !Number.isFinite(Number(preco))) {
        alert("Informe um preço válido.");
        return;
    }

    try {
        const produto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: Number(preco),
            cores: cores.map((cor) => ({
                nome: cor.nome.trim(),
                tamanhos: cor.tamanhos.map((tamanho) => ({
                    nome: tamanho.nome.trim(),
                    quantidade: Number(tamanho.quantidade)
                }))
            })),
            criadoEm: serverTimestamp()
        };

        await addDoc(collection(db, "produtos"), produto);

        alert("Produto cadastrado com sucesso!");

        setNome("");
        setDescricao("");
        setPreco("");
        setCores([
            { nome: "", tamanhos: [{ nome: "", quantidade: 0 }] }
        ]);

        onClose();
    } catch (erro) {
        console.error("Erro ao cadastrar produto:", erro);
        alert("Não foi possível cadastrar o produto. Verifique as permissões do banco.");
    }
}

    return (
        <form className="product-form" onSubmit={handleSubmit}>
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
                <label htmlFor="preco">Preço (R$)</label>
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

            <section className="variacoes">
                <h3>Variações e estoque</h3>
                <p>Informe as cores, os tamanhos e a quantidade de cada opção.</p>

                {cores.map((cor, indiceCor) => (
                    <div className="cor-card" key={indiceCor}>
                        <div className="form-group">
                            <label htmlFor={`cor-${indiceCor}`}>
                                Cor {indiceCor + 1}
                            </label>
                            <input
                                id={`cor-${indiceCor}`}
                                type="text"
                                value={cor.nome}
                                onChange={(e) =>
                                    atualizarCor(indiceCor, e.target.value)
                                }
                                placeholder="Ex.: Branca"
                                required
                            />
                        </div>

                        {cor.tamanhos.map((tamanho, indiceTamanho) => (
                            <div className="tamanho-row" key={indiceTamanho}>
                                <div className="form-group">
                                    <label
                                        htmlFor={`tamanho-${indiceCor}-${indiceTamanho}`}
                                    >
                                        Tamanho
                                    </label>
                                    <input
                                        id={`tamanho-${indiceCor}-${indiceTamanho}`}
                                        type="text"
                                        value={tamanho.nome}
                                        onChange={(e) =>
                                            atualizarTamanho(
                                                indiceCor,
                                                indiceTamanho,
                                                "nome",
                                                e.target.value
                                            )
                                        }
                                        placeholder="P, M, G..."
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label
                                        htmlFor={`quantidade-${indiceCor}-${indiceTamanho}`}
                                    >
                                        Quantidade
                                    </label>
                                    <input
                                        id={`quantidade-${indiceCor}-${indiceTamanho}`}
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={tamanho.quantidade}
                                        onChange={(e) =>
                                            atualizarTamanho(
                                                indiceCor,
                                                indiceTamanho,
                                                "quantidade",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="button-secondary"
                            onClick={() => adicionarTamanho(indiceCor)}
                        >
                            + Adicionar tamanho
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="button-secondary"
                    onClick={adicionarCor}
                >
                    + Adicionar cor
                </button>
            </section>

            <div className="form-actions">
                <button
                    type="button"
                    className="button-cancel"
                    onClick={onClose}
                >
                    Cancelar
                </button>

                <button type="submit" className="button-save">
                    Cadastrar produto
                </button>
            </div>
        </form>
    );
}

export default ProductForm;