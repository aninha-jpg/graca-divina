import "./productForm.css";
import ProductVariations from "../productVariarions/productVariations";
import ProductFields from "../productFields/productFields";
import saveProduct from "../hook/saveProduct";
import useProductForm from "../hook/useProductForm";
import { serverTimestamp } from "firebase/firestore";

function ProductForm({ onClose }) {
  const {
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
  } = useProductForm();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nome.trim() || !descricao.trim() || !preco) {
      alert("Preencha todos os campos.");
      return;
    }

    if (Number(preco) <= 0 || !Number.isFinite(Number(preco))) {
      alert("Informe um preço válido.");
      return;
    }

    try {
      const produto = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: Number(preco),
        cores: cores.map((cor) => ({
          nome: cor.nome.trim(),
          tamanhos: cor.tamanhos.map((tamanho) => ({
            nome: tamanho.nome.trim(),
            quantidade: Number(tamanho.quantidade)
          }))
        })),
        criadoEm: serverTimestamp()
      };

      await saveProduct(produto);

      limparFormulario();
      onClose();
    } catch (erro) {
      console.error("Erro ao cadastrar produto:", erro);
      alert("Não foi possível cadastrar o produto.");
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <ProductFields
        nome={nome}
        setNome={setNome}
        descricao={descricao}
        setDescricao={setDescricao}
        preco={preco}
        setPreco={setPreco}
      />

      <ProductVariations
        cores={cores}
        atualizarCor={atualizarCor}
        adicionarCor={adicionarCor}
        removerCor={removerCor}
        atualizarTamanho={atualizarTamanho}
        adicionarTamanho={adicionarTamanho}
        removerTamanho={removerTamanho}
      />

      <div className="form-actions">
        <button
          type="button"
          className="button-cancel"
          onClick={onClose}
        >
          Cancelar
        </button>

        <button type="submit" className="button-save">
          Cadastrar produto
        </button>
      </div>
    </form>
  );
}

export default ProductForm;