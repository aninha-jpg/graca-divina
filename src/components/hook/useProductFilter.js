import { useMemo, useState } from "react";

function useProductFilters(produtos) {
    const [busca, setBusca] = useState("");
    const [corSelecionada, setCorSelecionada] = useState("");
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

    const [filtrosAplicados, setFiltrosAplicados] = useState({
        busca: "",
        cor: "",
        tamanho: ""
    });

    const [filtrosAtivos, setFiltrosAtivos] = useState(false);

    const coresDisponiveis = useMemo(() => {
        return [
            ...new Set(
                produtos.flatMap((produto) =>
                    (produto.cores || [])
                        .map((cor) => cor.nome)
                        .filter(Boolean)
                )
            )
        ].sort();
    }, [produtos]);

    const tamanhosDisponiveis = useMemo(() => {
        return [
            ...new Set(
                produtos.flatMap((produto) =>
                    (produto.cores || []).flatMap((cor) =>
                        (cor.tamanhos || [])
                            .map((tamanho) => tamanho.nome)
                            .filter(Boolean)
                    )
                )
            )
        ].sort();
    }, [produtos]);

    const produtosFiltrados = useMemo(() => {
    if (!filtrosAtivos) {
        return produtos;
    }

    return produtos.filter((produto) => {
        const termo = filtrosAplicados.busca.trim().toLowerCase();

        const correspondeBusca =
            !termo ||
            (produto.nome || "").toLowerCase().includes(termo) ||
            (produto.descricao || "").toLowerCase().includes(termo);

        const correspondeCor =
            !filtrosAplicados.cor ||
            (produto.cores || []).some(
                (cor) => cor.nome === filtrosAplicados.cor
            );

        const correspondeTamanho =
            !filtrosAplicados.tamanho ||
            (produto.cores || []).some((cor) =>
                (cor.tamanhos || []).some(
                    (tamanho) =>
                        tamanho.nome === filtrosAplicados.tamanho
                )
            );

            return (
                correspondeBusca &&
                correspondeCor &&
                correspondeTamanho
            );
        });
    }, [produtos, filtrosAplicados, filtrosAtivos]);

    function aplicarFiltros() {
        setFiltrosAplicados({
            busca,
            cor: corSelecionada,
            tamanho: tamanhoSelecionado
        });

        setFiltrosAtivos(true);
    }
    function limparFiltros() {
        setBusca("");
        setCorSelecionada("");
        setTamanhoSelecionado("");

        setFiltrosAplicados({
            busca: "",
            cor: "",
            tamanho: ""
        });

        setFiltrosAtivos(false);
    }

    return {
        busca,
        setBusca,
        corSelecionada,
        setCorSelecionada,
        tamanhoSelecionado,
        setTamanhoSelecionado,
        coresDisponiveis,
        tamanhosDisponiveis,
        produtosFiltrados,
        aplicarFiltros,
        limparFiltros
    };
}

export default useProductFilters;