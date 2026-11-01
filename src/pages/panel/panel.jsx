import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

import "./panel.css";

import calcularEstoque from "../../components/utils/calcularEstoque";
import PanelSummary from "../../components/panelSummary/panelSummary";
import AdminSidebar from "../../components/adminSidebar/adminSidebar";
import AdminNavbar from "../../components/adminSidebar/adminNavbar";
import QuickStock from "../../components/quickStock/quickStock";

function Panel() {
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
        setErro("Não foi possível carregar o resumo do estoque.");
        setCarregando(false);
      }
    );

    return () => cancelarInscricao();
  }, []);

  const totalProdutos = produtos.length;
  const totalEstoque = calcularEstoque(produtos);

  return (
    <main className="panel-page">
      <AdminNavbar />
      <AdminSidebar />

      <div className="panel-main">
        <section className="panel-content">
          <header className="panel-header">
            <h1>Visão geral</h1>
            <p>Bem-vinda ao painel administrativo da Graça Divina.</p>
          </header>

          {erro ? (
            <p className="panel-error" role="alert">
              {erro}
            </p>
          ) : (
            <PanelSummary
              totalProdutos={totalProdutos}
              totalEstoque={totalEstoque}
              carregando={carregando}
            />
          )}
          <QuickStock produtos={produtos} />
        </section>
      </div>
    </main>
  );
}

export default Panel;