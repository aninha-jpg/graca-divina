import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import "./panel.css";
import ProductModal from "../../components/modals/productModal";
import calcularEstoque from "../../components/utils/calcularEstoque";
import PanelHeader from "../../components/panelHeader/panelHeader";
import PanelSummary from "../../components/panelSummary/panelSummary";
import ProductList from "../../components/productList/productList";
import ProductFilters from "../../components/productFilter/productFilter";
import useProductFilters from "../../components/hook/useProductFilter";

function Panel() {
    const [modalAberto, setModalAberto] = useState(false);
    const [produtoEdicao, setProdutoEdicao] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const produtosRef = collection(db, "produtos");

        const cancelarInscricao = onSnapshot(
            produtosRef,
            (snapshot) => {
                const listaProdutos = snapshot.docs.map((documento) => ({
                    id: documento.id,
                    ...documento.data()
                }));

                setProdutos(listaProdutos);
                setCarregando(false);
                setErro("");
            },
            (erro) => {
                console.error("Erro ao buscar produtos:", erro);
                setErro("Não foi possível carregar os produtos.");
                setCarregando(false);
            }
        );

            return () => cancelarInscricao();
        }, []);

        const totalProdutos = produtos.length;
        const totalEstoque = calcularEstoque(produtos);

        const {
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
        } = useProductFilters(produtos);

        console.log({
            total: produtos.length,
            exibidos: produtosFiltrados.length
        });

    return (
        <main className="panel-page">
            <PanelHeader />

            <section className="panel-content">
                <PanelSummary
                    totalProdutos={totalProdutos}
                    totalEstoque={totalEstoque}
                    carregando={carregando}
                />

                <ProductFilters
                    busca={busca}
                    setBusca={setBusca}
                    corSelecionada={corSelecionada}
                    setCorSelecionada={setCorSelecionada}
                    tamanhoSelecionado={tamanhoSelecionado}
                    setTamanhoSelecionado={setTamanhoSelecionado}
                    coresDisponiveis={coresDisponiveis}
                    tamanhosDisponiveis={tamanhosDisponiveis}
                    aplicarFiltros={aplicarFiltros}
                    limparFiltros={limparFiltros}
                />

                <section className="panel-products">
                    <div>
                        <h2>Seus produtos</h2>
                        <p>Cadastre e organize os produtos da loja.</p>
                    </div>

                    <button type="button" onClick={() => { setProdutoEdicao(null); setModalAberto(true);}}> + Novo produto </button>
                </section>

                <ProductList
                    produtos={produtosFiltrados}
                    carregando={carregando}
                    erro={erro}
                    onEditar={(produto) => {
                        setProdutoEdicao(produto);
                        setModalAberto(true);
                    }}
                />
            </section>

            {modalAberto && (
                <ProductModal onClose={() => { setModalAberto(false); setProdutoEdicao(null); }}
                    produtoEdicao={produtoEdicao}
                />
                )}
        </main>
    );
}

export default Panel;