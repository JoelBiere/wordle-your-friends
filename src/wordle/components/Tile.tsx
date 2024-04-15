import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import { CSSTransition } from 'react-transition-group';

export const ResultColor = {
    light: {
        correct: '#6AAA64',
        close: '#C9B458',
        wrong: "#787C7E",
        default: "#FFFFFF"
    },
    dark: {
        correct: "#538D4E",
        close: "#B59F3B",
        wrong: "#3A3A3C",
        default: "#121213"
    }

}

const Tile = (props: {
    answerLetter: string,
    letter: string,
    guessIndex: number,
    guessCount: number,
    answer: string,
    theme: 'dark' | 'light'
    colIndex: number
}) => {
    const [letter, setLetter] = useState('')
    const [guessedLetter, setGuessedLetter] = useState('')
    const [color, setColor] = useState<string>(ResultColor[props.theme].default)
    const [inProp, setInProp] = useState(false); // State to manage the flip effect

    const submitGuess = () => {
        console.log(`entering submitGuess puzzle is ${props.answerLetter} guessed is ${letter}`)
        // user just submitted guess, permantly display
        setGuessedLetter(letter)
        if (props.answerLetter === letter) {
            setColor(ResultColor[props.theme].correct)
        } else if (props.answer.includes(letter)) {
            setColor(ResultColor[props.theme].close)
        } else {
            setColor(ResultColor[props.theme].wrong)
        }
    }

    useEffect(() => {
        if(color !== ResultColor[props.theme].default){
            const delay = props.colIndex * 100; // 100ms delay increment per tile
            const timer = setTimeout(() => {
                setInProp(true);
            }, delay);

            return () => clearTimeout(timer);
        }

    },[color, props.colIndex])

    useEffect(() => {
        if (props.guessCount === props.guessIndex + 1) {
            submitGuess()
        } else {
            setLetter(props.guessIndex === props.guessCount ? props.letter : '')
        }
    }, [props.letter, props.guessCount]);

    return (
        <CSSTransition in={inProp} timeout={300} classNames="flip">
        <Card style={
            {
                backgroundColor: color,
                color: color === ResultColor[props.theme].default ? 'black' : ResultColor[props.theme].default,
                fontSize: 'larger',
                fontWeight: 'bolder'
            }}>
            {guessedLetter ? guessedLetter : letter}
        </Card>
        </CSSTransition>
    )

}

export default Tile

