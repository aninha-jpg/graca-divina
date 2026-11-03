import { useState } from "react";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import {
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

import { db } from "../../../firebase";
import ConfirmSaleModal from "../confirmSaleModal/confirmSaleModal";

import "./quickStock.css";

function QuickStock({ produtos = [] }) {
  const [busca, setBusca] = useState("");
  const [produtoAberto, setProdutoAberto] = useState(null);
  const [atualizando, setAtualizando] = useState({});
  const [reducaoPendente, setReducaoPendente] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const produtosFiltrados = produtos.filter((produto) =>
    (produto.nome || "")
      .toLowerCase()
      .includes(busca.trim().toLowerCase())
  );

  const alterarEstoque = async ({
    produto,
    nomeCor,
    nomeTamanho,
    variacao,
    registrarVenda = false,
  }) => {
    const chave = `${produto.id}-${nomeCor}-${nomeTamanho}`;

    if (atualizando[chave]) return;

    setAtualizando((estado) => ({
      ...estado,
      [chave]: true,
    }));

    setErro("");
    setSucesso("");

    try {
      const referenciaProduto = doc(db, "produtos", produto.id);

      const referenciaVenda = registrarVenda
        ? doc(collection(db, "vendas"))
        : null;

      await runTransaction(db, async (transacao) => {
        const documento = await transacao.get(referenciaProduto);

        if (!documento.exists()) {
          throw new Error("Este produto não foi encontrado.");
        }

        const dadosProduto = documento.data();
        const cores = dadosProduto.cores || [];

        const indiceCor = cores.findIndex(
          (cor) => cor.nome === nomeCor
        );

        if (indiceCor === -1) {
          throw new Error("A cor selecionada não foi encontrada.");
        }

        const tamanhos = cores[indiceCor].tamanhos || [];

        const indiceTamanho = tamanhos.findIndex(
          (tamanho) => tamanho.nome === nomeTamanho
        );

        if (indiceTamanho === -1) {
          throw new Error(
            "O tamanho selecionado não foi encontrado."
          );
        }

        const quantidadeAtual = Number(
          tamanhos[indiceTamanho].quantidade || 0
        );

        const novaQuantidade = quantidadeAtual + variacao;

        if (novaQuantidade < 0) {
          throw new Error("O estoque não pode ficar negativo.");
        }

        const valorUnitario = Number(dadosProduto.preco);
        const custoUnitario = Number(dadosProduto.custo);

        if (
          registrarVenda &&
          (!Number.isFinite(valorUnitario) || valorUnitario < 0)
        ) {
          throw new Error(
            "O preço deste produto é inválido. Corrija o cadastro antes de registrar a venda."
          );
        }

        if (
          registrarVenda &&
          (
            dadosProduto.custo === undefined ||
            dadosProduto.custo === null ||
            dadosProduto.custo === "" ||
            !Number.isFinite(custoUnitario) ||
            custoUnitario < 0
          )
        ) {
          throw new Error(
            "O custo deste produto não está cadastrado corretamente. Atualize o cadastro antes de registrar a venda."
          );
        }

        const custoTotal = Number(custoUnitario.toFixed(2));

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

        if (registrarVenda) {
          transacao.set(referenciaVenda, {
            produtoId: produto.id,
            produtoNome: dadosProduto.nome || produto.nome,
            cor: nomeCor,
            tamanho: nomeTamanho,
            quantidade: 1,
            valorUnitario,
            total: valorUnitario,
            custoUnitario,
            custoTotal,
            criadoEm: serverTimestamp(),
          });
        }
      });

      if (registrarVenda) {
        setSucesso(
          "Venda registrada e estoque atualizado com sucesso!"
        );
      } else if (variacao < 0) {
        setSucesso("Estoque atualizado com sucesso!");
      } else {
        setSucesso("Peça adicionada ao estoque com sucesso!");
      }

      if (registrarVenda || variacao < 0) {
        setReducaoPendente(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);

      setErro(
        error.message || "Não foi possível atualizar o estoque."
      );
    } finally {
      setAtualizando((estado) => ({
        ...estado,
        [chave]: false,
      }));
    }
  };

  const adicionarEstoque = (produto, nomeCor, nomeTamanho) => {
    alterarEstoque({
      produto,
      nomeCor,
      nomeTamanho,
      variacao: 1,
    });
  };

  const solicitarReducao = (
    produto,
    nomeCor,
    nomeTamanho,
    quantidade
  ) => {
    const chave = `${produto.id}-${nomeCor}-${nomeTamanho}`;

    if (atualizando[chave] || quantidade <= 0) return;

    setErro("");
    setSucesso("");

    setReducaoPendente({
      produto,
      nomeCor,
      nomeTamanho,
      chave,
    });
  };

  const atualizarEstoqueSemVenda = () => {
    if (!reducaoPendente) return;

    alterarEstoque({
      produto: reducaoPendente.produto,
      nomeCor: reducaoPendente.nomeCor,
      nomeTamanho: reducaoPendente.nomeTamanho,
      variacao: -1,
      registrarVenda: false,
    });
  };

  const registrarVenda = () => {
    if (!reducaoPendente) return;

    alterarEstoque({
      produto: reducaoPendente.produto,
      nomeCor: reducaoPendente.nomeCor,
      nomeTamanho: reducaoPendente.nomeTamanho,
      variacao: -1,
      registrarVenda: true,
    });
  };

  const fecharModal = () => {
    if (
      reducaoPendente &&
      atualizando[reducaoPendente.chave]
    ) {
      return;
    }

    setReducaoPendente(null);
  };

  const carregandoModal = reducaoPendente
    ? Boolean(atualizando[reducaoPendente.chave])
    : false;

  return (
    <section className="quick-stock">
      <header className="quick-stock-header">
        <div>
          <h2>Atualização rápida de estoque</h2>
          <p>
            Ajuste as quantidades sem precisar editar o produto.
          </p>
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
        <p
          className="quick-stock-message error"
          role="alert"
        >
          {erro}
        </p>
      )}

      {sucesso && (
        <p
          className="quick-stock-message success"
          role="status"
        >
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
              <article
                className="quick-stock-product"
                key={produto.id}
              >
                <button
                  type="button"
                  className="quick-stock-product-toggle"
                  onClick={() =>
                    setProdutoAberto(
                      aberto ? null : produto.id
                    )
                  }
                  aria-expanded={aberto}
                >
                <span className="quick-stock-product-info">
                  <strong>{produto.nome}</strong>

                  {produto.descricao && (
                      <small className="quick-stock-description">
                          {produto.descricao}
                      </small>
                  )}

                  <small>
                      {quantidadeTotal}{" "}
                      {quantidadeTotal === 1 ? "peça" : "peças"}{" "}
                      em estoque
                  </small>
              </span>

                  {aberto ? <UpOutlined /> : <DownOutlined />}
                </button>

                {aberto && (
                  <div className="quick-stock-variations">
                    {(produto.cores || []).length === 0 ? (
                      <p className="quick-stock-empty">
                        Este produto ainda não possui variações
                        cadastradas.
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

                              const salvando = Boolean(
                                atualizando[chave]
                              );

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
                                        solicitarReducao(
                                          produto,
                                          cor.nome,
                                          tamanho.nome,
                                          quantidade
                                        )
                                      }
                                      disabled={
                                        salvando || quantidade <= 0
                                      }
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
                                        adicionarEstoque(
                                          produto,
                                          cor.nome,
                                          tamanho.nome
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

      <ConfirmSaleModal
        produto={reducaoPendente?.produto}
        nomeCor={reducaoPendente?.nomeCor}
        nomeTamanho={reducaoPendente?.nomeTamanho}
        onCancel={fecharModal}
        onUpdateStock={atualizarEstoqueSemVenda}
        onRegisterSale={registrarVenda}
        loading={carregandoModal}
      />
    </section>
  );
}

export default QuickStock;