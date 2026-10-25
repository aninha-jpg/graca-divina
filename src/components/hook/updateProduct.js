import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

async function updateProduct(id, produto) {
    const produtoRef = doc(db, "produtos", id);

    await updateDoc(produtoRef, {
        ...produto
    });
}

export default updateProduct;