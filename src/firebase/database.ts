import {doc, getDoc, getFirestore} from "firebase/firestore";
import app from "./init";
import dayjs from "dayjs";

export const db = getFirestore(app);

export const getWordOfTheDay = async () => {

    const docRef = doc(db, "words", dayjs().format("YYYY-MM-DD"));
    const docSnap = await getDoc(docRef);
    console.log('This is docRef', docRef)

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}


export const isWordInList = async (guess: string) => {
    const docRef = doc(db,'word-list', guess.toLowerCase())
    const docSnap = await getDoc(docRef)
    console.log("Checking if word in list with this as ref", docRef)
    return docSnap.exists();
}