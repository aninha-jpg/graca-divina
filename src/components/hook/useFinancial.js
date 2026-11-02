import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../firebase";

export default function useFinancial() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [produtoId, setProdutoId] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("");
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [valorUnitario, setValorUnitario] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const cancelarProdutos = onSnapshot(
      collection(db, "produtos"),
      (snapshot) => {
        const listaProdutos = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        setProdutos(listaProdutos);
        setCarregando(false);
      },
      (error) => {
        console.error("Erro ao carregar produtos:", error);
        setErro("Não foi possível carregar os produtos.");
        setCarregando(false);
      }
    );

    const cancelarVendas = onSnapshot(
      collection(db, "vendas"),
      (snapshot) => {
        const listaVendas = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        listaVendas.sort(
          (a, b) =>
            (b.criadoEm?.toMillis?.() ?? 0) -
            (a.criadoEm?.toMillis?.() ?? 0)
        );

        setVendas(listaVendas);
      },
      (error) => {
        console.error("Erro ao carregar vendas:", error);
        setErro("Não foi possível carregar o histórico de vendas.");
      }
    );

    return () => {
      cancelarProdutos();
      cancelarVendas();
    };
  }, []);

  const produtoSelecionado = produtos.find(
    (produto) => produto.id === produtoId
  );

  const corAtual = produtoSelecionado?.cores?.find(
    (cor) => cor.nome === corSelecionada
  );

  const tamanhoAtual = corAtual?.tamanhos?.find(
    (tamanho) => tamanho.nome === tamanhoSelecionado
  );

  const estoqueDisponivel = Number(tamanhoAtual?.quantidade ?? 0);

  const totalVenda =
    (Number(quantidade) || 0) * (Number(valorUnitario) || 0);

  function selecionarProduto(id) {
    const produto = produtos.find((item) => item.id === id);
    const primeiraCor = produto?.cores?.[0];
    const primeiroTamanho = primeiraCor?.tamanhos?.[0];

    setProdutoId(id);
    setCorSelecionada(primeiraCor?.nome ?? "");
    setTamanhoSelecionado(primeiroTamanho?.nome ?? "");

    setValorUnitario(
      produto?.preco != null ? String(produto.preco) : ""
    );

    setQuantidade("1");
    setErro("");
    setMensagem("");
  }

  function selecionarCor(nomeCor) {
    const cor = produtoSelecionado?.cores?.find(
      (item) => item.nome === nomeCor
    );

    setCorSelecionada(nomeCor);
    setTamanhoSelecionado(cor?.tamanhos?.[0]?.nome ?? "");
    setErro("");
    setMensagem("");
  }

  const vendasDoMes = useMemo(() => {
    const agora = new Date();

    return vendas.filter((venda) => {
      if (!venda.criadoEm?.toDate) return false;

      const dataVenda = venda.criadoEm.toDate();

      return (
        dataVenda.getMonth() === agora.getMonth() &&
        dataVenda.getFullYear() === agora.getFullYear()
      );
    });
  }, [vendas]);

  console.log(
    "PRODUTOS CARREGADOS:",
    produtos.map((p) => ({
      id: p.id,
      nome: p.nome,
      custo: p.custo,
    }))
  );

  console.log(
    "VENDAS DO MÊS:",
    vendasDoMes.map((v) => ({
      produtoId: v.produtoId,
      produtoNome: v.produtoNome,
      custoTotal: v.custoTotal,
      quantidade: v.quantidade,
    }))
  );

  const faturamentoMes = useMemo(
    () =>
      vendasDoMes.reduce(
        (total, venda) => total + Number(venda.total || 0),
        0
      ),
    [vendasDoMes]
  );

  const pecasVendidas = useMemo(
    () =>
      vendasDoMes.reduce(
        (total, venda) => total + Number(venda.quantidade || 0),
        0
      ),
    [vendasDoMes]
  );

  const vendasComCusto = useMemo(() => {
    return vendasDoMes.map((venda) => {
      const custoSalvo = Number(venda.custoTotal);

      const possuiCustoSalvo =
        venda.custoTotal !== undefined &&
        venda.custoTotal !== null &&
        venda.custoTotal !== "" &&
        Number.isFinite(custoSalvo) &&
        custoSalvo >= 0;

      if (possuiCustoSalvo) {
        return {
          ...venda,
          custoCalculado: custoSalvo,
          custoDisponivel: true,
        };
      }

      const produto = produtos.find(
        (item) => item.id === venda.produtoId
      );

      const custoUnitario = Number(produto?.custo);
      const quantidadeVenda = Number(venda.quantidade);

      const custoValido =
        produto?.custo !== undefined &&
        produto?.custo !== null &&
        produto?.custo !== "" &&
        Number.isFinite(custoUnitario) &&
        custoUnitario >= 0 &&
        Number.isFinite(quantidadeVenda) &&
        quantidadeVenda > 0;

      if (!custoValido) {
        return {
          ...venda,
          custoCalculado: null,
          custoDisponivel: false,
        };
      }

      return {
        ...venda,
        custoCalculado: Number(
          (custoUnitario * quantidadeVenda).toFixed(2)
        ),
        custoDisponivel: true,
      };
    });
  }, [vendasDoMes, produtos]);

  const custosCompletos = useMemo(
    () => vendasComCusto.every((venda) => venda.custoDisponivel),
    [vendasComCusto]
  );

  const custoMes = useMemo(
    () =>
      vendasComCusto.reduce((total, venda) => {
        if (!venda.custoDisponivel) return total;
        return total + venda.custoCalculado;
      }, 0),
    [vendasComCusto]
  );

  const lucroBrutoMes = custosCompletos
    ? Number((faturamentoMes - custoMes).toFixed(2))
    : null;

  async function registrarVenda(event) {
    event.preventDefault();

    setErro("");
    setMensagem("");

    const quantidadeVenda = Number(quantidade);
    const precoVenda = Number(valorUnitario);
    const total = quantidadeVenda * precoVenda;

    if (!produtoId || !corSelecionada || !tamanhoSelecionado) {
      setErro("Selecione o produto, a cor e o tamanho.");
      return;
    }

    if (
      !Number.isInteger(quantidadeVenda) ||
      quantidadeVenda <= 0
    ) {
      setErro("Informe uma quantidade inteira maior que zero.");
      return;
    }

    if (!Number.isFinite(precoVenda) || precoVenda <= 0) {
      setErro("Informe um valor unitário válido.");
      return;
    }

    if (!Number.isFinite(total)) {
      setErro("Não foi possível calcular o total da venda.");
      return;
    }

    setSalvando(true);

    try {
      await runTransaction(db, async (transaction) => {
        const produtoRef = doc(db, "produtos", produtoId);
        const vendaRef = doc(collection(db, "vendas"));

        const produtoDoc = await transaction.get(produtoRef);

        if (!produtoDoc.exists()) {
          throw new Error("Produto não encontrado.");
        }

        const produto = produtoDoc.data();
        const cores = produto.cores ?? [];

        const corExiste = cores.some(
          (cor) => cor.nome === corSelecionada
        );

        const tamanhoExiste = cores.some(
          (cor) =>
            cor.nome === corSelecionada &&
            (cor.tamanhos ?? []).some(
              (tamanho) => tamanho.nome === tamanhoSelecionado
            )
        );

        if (!corExiste || !tamanhoExiste) {
          throw new Error(
            "A cor ou o tamanho selecionado não foi encontrado."
          );
        }

        const custoUnitario = Number(produto.custo);

        if (
          produto.custo === undefined ||
          produto.custo === null ||
          produto.custo === "" ||
          !Number.isFinite(custoUnitario) ||
          custoUnitario < 0
        ) {
          throw new Error(
            "O produto não possui um custo válido cadastrado."
          );
        }

        const custoTotal = Number(
          (custoUnitario * quantidadeVenda).toFixed(2)
        );

        const coresAtualizadas = cores.map((cor) => {
          if (cor.nome !== corSelecionada) return cor;

          return {
            ...cor,
            tamanhos: (cor.tamanhos ?? []).map((tamanho) => {
              if (tamanho.nome !== tamanhoSelecionado) {
                return tamanho;
              }

              const estoqueAtual = Number(tamanho.quantidade);

              if (
                !Number.isFinite(estoqueAtual) ||
                estoqueAtual < quantidadeVenda
              ) {
                throw new Error(
                  "Estoque insuficiente para essa venda."
                );
              }

              return {
                ...tamanho,
                quantidade: estoqueAtual - quantidadeVenda,
              };
            }),
          };
        });

        transaction.update(produtoRef, {
          cores: coresAtualizadas,
        });

        transaction.set(vendaRef, {
          produtoId,
          produtoNome: produto.nome,
          cor: corSelecionada,
          tamanho: tamanhoSelecionado,
          quantidade: quantidadeVenda,
          valorUnitario: precoVenda,
          total: Number(total.toFixed(2)),
          custoUnitario,
          custoTotal,
          criadoEm: serverTimestamp(),
        });
      });

      setMensagem("Venda registrada com sucesso!");
      setQuantidade("1");
      setErro("");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);

      setErro(
        error.message ||
          "Não foi possível registrar a venda. Tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  return {
    produtos,
    vendas,
    produtoId,
    corSelecionada,
    tamanhoSelecionado,
    quantidade,
    valorUnitario,
    carregando,
    salvando,
    erro,
    mensagem,
    produtoSelecionado,
    corAtual,
    tamanhoAtual,
    estoqueDisponivel,
    totalVenda,
    vendasDoMes,
    faturamentoMes,
    pecasVendidas,
    custoMes,
    lucroBrutoMes,
    custosCompletos,
    selecionarProduto,
    selecionarCor,
    setTamanhoSelecionado,
    setQuantidade,
    setValorUnitario,
    registrarVenda,
  };
}