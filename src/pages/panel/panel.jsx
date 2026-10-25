import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import "./panel.css";
import ProductModal from "../../components/modals/productModal";
import calcularEstoque from "../../components/utils/calcularEstoque";
import PanelHeader from "../../components/panelHeader/panelHeader";
import PanelSummary from "../../components/panelSummary/panelSummary";
import ProductList from "../../components/productList/productList";

function Panel() {
    const [modalAberto, setModalAberto] = useState(false);
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

    return (
        <main className="panel-page">
            <PanelHeader />

            <section className="panel-content">
                <PanelSummary
                    totalProdutos={totalProdutos}
                    totalEstoque={totalEstoque}
                    carregando={carregando}
                />

                <section className="panel-products">
                    <div>
                        <h2>Seus produtos</h2>
                        <p>Cadastre e organize os produtos da loja.</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setModalAberto(true)}
                    >
                        + Novo produto
                    </button>
                </section>

                <ProductList
                    produtos={produtos}
                    carregando={carregando}
                    erro={erro}
                />
            </section>

            {modalAberto && (
                <ProductModal onClose={() => setModalAberto(false)} />
            )}
        </main>
    );
}

export default Panel;