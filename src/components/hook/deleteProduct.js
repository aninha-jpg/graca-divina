import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";

async function deleteProduct(id) {
    const produtoRef = doc(db, "produtos", id);

    await deleteDoc(produtoRef);
}

export default deleteProduct;