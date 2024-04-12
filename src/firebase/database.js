import {doc, getDoc, getFirestore} from "firebase/firestore";
import app from "./init";

export const db = getFirestore(app);

export const getWordOfTheDay = async () => {

    const docRef = doc(db, "words", "2024-04-08");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
