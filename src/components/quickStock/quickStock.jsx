import { useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { SearchOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { db } from "../../../firebase";
import "./quickStock.css";

function QuickStock({ produtos = [] }) {
  const [busca, setBusca] = useState("");
  const [produtoAberto, setProdutoAberto] = useState(null);
  const [atualizando, setAtualizando] = useState({});
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const produtosFiltrados = produtos.filter((produto) =>
    (produto.nome || "").toLowerCase().includes(busca.trim().toLowerCase())
  );

  const atualizarQuantidade = async (produto, nomeCor, nomeTamanho, variacao) => {
    const chave = `${produto.id}-${nomeCor}-${nomeTamanho}`;

    if (atualizando[chave]) return;

    setAtualizando((estado) => ({ ...estado, [chave]: true }));
    setErro("");
    setSucesso("");

    try {
      const referenciaProduto = doc(db, "produtos", produto.id);

      await runTransaction(db, async (transacao) => {
        const documento = await transacao.get(referenciaProduto);

        if (!documento.exists()) {
          throw new Error("Este produto não foi encontrado.");
        }

        const dadosProduto = documento.data();
        const cores = dadosProduto.cores || [];

        const indiceCor = cores.findIndex((cor) => cor.nome === nomeCor);

        if (indiceCor === -1) {
          throw new Error("A cor selecionada não foi encontrada.");
        }

        const tamanhos = cores[indiceCor].tamanhos || [];
        const indiceTamanho = tamanhos.findIndex(
          (tamanho) => tamanho.nome === nomeTamanho
        );

        if (indiceTamanho === -1) {
          throw new Error("O tamanho selecionado não foi encontrado.");
        }

        const quantidadeAtual = Number(
          tamanhos[indiceTamanho].quantidade || 0
        );

        const novaQuantidade = quantidadeAtual + variacao;

        if (novaQuantidade < 0) {
          throw new Error("O estoque não pode ficar negativo.");
        }

        const coresAtualizadas = cores.map((cor, indice) => {
          if (indice !== indiceCor) return cor;

          return {
            ...cor,
            tamanhos: tamanhos.map((tamanho, indice) => {
              if (indice !== indiceTamanho) return tamanho;

              return {
                ...tamanho,
                quantidade: novaQuantidade,
              };
            }),
          };
        });

        transacao.update(referenciaProduto, {
          cores: coresAtualizadas,
        });
      });

      setSucesso("Estoque atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      setErro(error.message || "Não foi possível atualizar o estoque.");
    } finally {
      setAtualizando((estado) => ({
        ...estado,
        [chave]: false,
      }));
    }
  };

  return (
    <section className="quick-stock">
      <header className="quick-stock-header">
        <div>
          <h2>Atualização rápida de estoque</h2>
          <p>Ajuste as quantidades sem precisar editar o produto.</p>
        </div>
      </header>

      <label className="quick-stock-search">
        <SearchOutlined />
        <input
          type="search"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          aria-label="Buscar produto pelo nome"
        />
      </label>

      {erro && (
        <p className="quick-stock-message error" role="alert">
          {erro}
        </p>
      )}

      {sucesso && (
        <p className="quick-stock-message success" role="status">
          {sucesso}
        </p>
      )}

      <div className="quick-stock-list">
        {produtosFiltrados.length === 0 ? (
          <p className="quick-stock-empty">
            {busca
              ? "Nenhum produto encontrado."
              : "Nenhum produto cadastrado ainda."}
          </p>
        ) : (
          produtosFiltrados.map((produto) => {
            const aberto = produtoAberto === produto.id;

            const quantidadeTotal = (produto.cores || []).reduce(
              (total, cor) =>
                total +
                (cor.tamanhos || []).reduce(
                  (soma, tamanho) =>
                    soma + Number(tamanho.quantidade || 0),
                  0
                ),
              0
            );

            return (
              <article className="quick-stock-product" key={produto.id}>
                <button
                  type="button"
                  className="quick-stock-product-toggle"
                  onClick={() =>
                    setProdutoAberto(aberto ? null : produto.id)
                  }
                  aria-expanded={aberto}
                >
                  <span className="quick-stock-product-info">
                    <strong>{produto.nome}</strong>
                    <small>
                      {quantidadeTotal}{" "}
                      {quantidadeTotal === 1 ? "peça" : "peças"} em estoque
                    </small>
                  </span>

                  {aberto ? <UpOutlined /> : <DownOutlined />}
                </button>

                {aberto && (
                  <div className="quick-stock-variations">
                    {(produto.cores || []).length === 0 ? (
                      <p className="quick-stock-empty">
                        Este produto ainda não possui variações cadastradas.
                      </p>
                    ) : (
                      produto.cores.map((cor, indiceCor) => (
                        <div
                          className="quick-stock-color"
                          key={`${produto.id}-${cor.nome}-${indiceCor}`}
                        >
                          <h3>{cor.nome}</h3>

                          {(cor.tamanhos || []).map(
                            (tamanho, indiceTamanho) => {
                              const chave = `${produto.id}-${cor.nome}-${tamanho.nome}`;
                              const quantidade = Number(
                                tamanho.quantidade || 0
                              );
                              const salvando = Boolean(atualizando[chave]);

                              return (
                                <div
                                  className="quick-stock-size"
                                  key={`${chave}-${indiceTamanho}`}
                                >
                                  <span className="quick-stock-size-name">
                                    {tamanho.nome}
                                  </span>

                                  <div className="quick-stock-controls">
                                    <button
                                      type="button"
                                      className="quick-stock-adjust"
                                      onClick={() =>
                                        atualizarQuantidade(
                                          produto,
                                          cor.nome,
                                          tamanho.nome,
                                          -1
                                        )
                                      }
                                      disabled={salvando || quantidade <= 0}
                                      aria-label={`Diminuir estoque de ${produto.nome}, ${cor.nome}, tamanho ${tamanho.nome}`}
                                    >
                                      −
                                    </button>

                                    <span
                                      className="quick-stock-quantity"
                                      aria-live="polite"
                                    >
                                      {salvando ? "..." : quantidade}
                                    </span>

                                    <button
                                      type="button"
                                      className="quick-stock-adjust"
                                      onClick={() =>
                                        atualizarQuantidade(
                                          produto,
                                          cor.nome,
                                          tamanho.nome,
                                          1
                                        )
                                      }
                                      disabled={salvando}
                                      aria-label={`Aumentar estoque de ${produto.nome}, ${cor.nome}, tamanho ${tamanho.nome}`}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default QuickStock;