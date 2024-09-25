import {doc, getDoc} from "firebase/firestore";

import dayjs from "dayjs";
import  {db} from "./config";
// ran out of words - so create mechanism to get more words after the last date in db
const getRandomWordFromDateRange = () => {
    const start = dayjs("2024-04-08");
    const end = dayjs("2024-08-07");

    const diffInDays = end.diff(start, 'day');
    const randomDays = Math.floor(Math.random() * (diffInDays + 1));
    const result = start.add(randomDays, 'day');

    return result.format("YYYY-MM-DD");
};

export const getWordOfTheDay = async () => {
    const today = dayjs().format("YYYY-MM-DD");
    let docRef = doc(db, "words", today);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No word for today, using a random date from the range");
        const randomDate = getRandomWordFromDateRange();
        docRef = doc(db, "words", randomDate);
        docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Random word found:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No word found even with random date. Check your database.");
            return null;
        }
    }
};


export const isWordInList = async (guess: string) => {
    const docRef = doc(db,'word-list', guess.toLowerCase())
    const docSnap = await getDoc(docRef)
    console.log("Checking if word in list with this as ref", docRef)
    return docSnap.exists();
}
