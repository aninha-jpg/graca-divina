import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";


async function saveProduct(produto){
    await addDoc(collection(db, "produtos"), produto);
}

export default saveProduct;
