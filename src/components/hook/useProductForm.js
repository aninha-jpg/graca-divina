import { useState } from "react";

function useProductForm() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [cores, setCores] = useState([
    { nome: "", tamanhos: [{ nome: "", quantidade: 0 }] }]);

    function atualizarCor(index, valor) {
        setCores((atuais) =>
            atuais.map((cor, i) =>
                i === index ? { ...cor, nome: valor } : cor
            )
        );
    }

    function adicionarCor() {
        setCores((atuais) => [
            ...atuais, { nome: "", tamanhos: [{ nome: "", quantidade: 0 }] }
        ]);
    }

    function removerCor(indiceCor) {
    setCores((atuais) =>
        atuais.filter((_, i) => i !== indiceCor) );
    }

    function atualizarTamanho(indiceCor, indiceTamanho, campo, valor) {
        setCores((atuais) =>
            atuais.map((cor, i) => {
                if (i !== indiceCor) return cor;
                return {
                    ...cor,
                    tamanhos: cor.tamanhos.map((tamanho, j) => j === indiceTamanho ? { ...tamanho, [campo]: valor } : tamanho)
                };
            })
        );
    }

    function adicionarTamanho(indiceCor) {
        setCores((atuais) =>
            atuais.map((cor, i) =>
                i === indiceCor
                    ? {
                        ...cor, tamanhos: [...cor.tamanhos, { nome: "", quantidade: 0 }] } : cor
            )
        );
    }

    function removerTamanho(indiceCor, indiceTamanho) {
    setCores((atuais) =>
            atuais.map((cor, i) => {
                if (i !== indiceCor) return cor;

                return {
                    ...cor,
                    tamanhos: cor.tamanhos.filter(
                        (_, j) => j !== indiceTamanho
                    )
                };
            })
        );
    }

    function limparFormulario() {
        setNome("");
        setDescricao("");
        setPreco("");
        setCores([
        { nome: "", tamanhos: [{ nome: "", quantidade: 0 }] }
        ]);
    }
    return {
        nome,
        setNome,
        descricao,
        setDescricao,
        preco,
        setPreco,
        cores,
        atualizarCor,
        adicionarCor,
        removerCor,
        atualizarTamanho,
        adicionarTamanho,
        removerTamanho,
        limparFormulario
    };
}
export default useProductForm;