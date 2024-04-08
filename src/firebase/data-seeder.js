import {words} from './wordle_words_no_dates'
import dayjs from 'dayjs';

const seedDate = dayjs('2024-04-07');

export const generateWordleWords = () => {
    return words.split("\n").reduce((acc, word, index) => {
        const date = seedDate.add(index, 'day');
        const dateString = date.format('YYYY-MM-DD');
        acc[dateString] = { word: word.trim() };
        return acc;
    }, {});
};


