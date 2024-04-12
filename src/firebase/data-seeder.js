import {words} from './wordle_words_no_dates'
import dayjs from 'dayjs';
import { collection, addDoc } from "firebase/firestore";
import {doc, setDoc} from "firebase/firestore";
import {db} from './database'

const seedDate = dayjs('2024-04-08');


export const seedData = async () => {
    const wordList = words.split("\n");

    for (let i = 0; i < wordList.length; i++) {
        const word = wordList[i].trim();
        const date = seedDate.add(i, 'day').format('YYYY-MM-DD');

        try {
            await setDoc(doc(db, "words", date), {word});
            console.log(`Document for ${date} added successfully.`);
        } catch (error) {
            console.error("Error adding document:", error);
        }
    }
}
