function calcularEstoque(produtos) {
    return produtos.reduce((total, produto) => {
        const quantidadeProduto = (produto.cores || []).reduce(
            (totalCores, cor) => {
                const quantidadeCor = (cor.tamanhos || []).reduce(
                    (totalTamanhos, tamanho) => {
                        return totalTamanhos + Number(tamanho.quantidade || 0);
                    },
                    0
                );

                return totalCores + quantidadeCor;
            },
            0
        );

        return total + quantidadeProduto;
    }, 0);
}

export default calcularEstoque;