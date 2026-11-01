import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

import "./products.css";

import ProductModal from "../../components/modals/productModal";
import ProductList from "../../components/productList/productList";
import ProductFilters from "../../components/productFilter/productFilter";
import useProductFilters from "../../components/hook/useProductFilter";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import AdminNavbar from "../../components/adminSidebar/adminNavbar";

function Products() {
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
          ...documento.data(),
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
    limparFiltros,
  } = useProductFilters(produtos);

  return (
    <main className="products-page">
      <AdminNavbar />
      <AdminSidebar />

      <div className="products-main">
        <section className="products-content">
          <header className="products-header">
            <div>
              <h1>Produtos</h1>
              <p>
                Cadastre, consulte e organize os produtos da Graça Divina.
              </p>
            </div>

            <button
              type="button"
              className="products-new-button"
              onClick={() => {
                setProdutoEdicao(null);
                setModalAberto(true);
              }}
            >
              + Novo produto
            </button>
          </header>

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
      </div>

      {modalAberto && (
        <ProductModal
          onClose={() => {
            setModalAberto(false);
            setProdutoEdicao(null);
          }}
          produtoEdicao={produtoEdicao}
        />
      )}
    </main>
  );
}

export default Products;