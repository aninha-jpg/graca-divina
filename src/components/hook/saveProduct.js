import {
  collection,
  doc,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../../../firebase";

async function saveProduct(produto) {
  const contadorRef = doc(db, "configuracoes", "contadorProdutos");

  await runTransaction(db, async (transaction) => {
    const contadorDoc = await transaction.get(contadorRef);

    const ultimoNumero = contadorDoc.exists()
      ? contadorDoc.data().ultimoNumero
      : 0;

    const novoNumero = ultimoNumero + 1;

    const codigo = `CAM-${String(novoNumero).padStart(3, "0")}`;

    const produtoRef = doc(collection(db, "produtos"));

    transaction.set(contadorRef, {
      ultimoNumero: novoNumero
    });

    transaction.set(produtoRef, {
      ...produto,
      codigo,
      criadoEm: serverTimestamp()
    });
  });
}

export default saveProduct;