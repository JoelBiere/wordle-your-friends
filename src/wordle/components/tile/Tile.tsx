import React, {useEffect, useState} from 'react'
import { FlipCardBack, FlipCardFront, FlipCardInner, ResultColor} from "./Styles";
import {theme} from "antd";

const { useToken } = theme;


const Tile = (props: {
    answerLetter: string,
    letter: string,
    guessIndex: number,
    guessCount: number,
    answer: string,
    theme: 'dark' | 'light'
    colIndex: number
}) => {
    const { token, theme } = useToken()

    console.log(`token is ${token.colorBgContainer} theme is ${theme.id}`)
    const [letter, setLetter] = useState('')
    const [guessedLetter, setGuessedLetter] = useState('')
    const [color, setColor] = useState<string>(ResultColor[props.theme].default)
    const [flipped, setFlipped] = useState(false); // State to manage the flip effect

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
        if (color !== ResultColor[props.theme].default) {
            const delay = props.colIndex * 100; // 100ms delay increment per tile
            const timer = setTimeout(() => {
                setFlipped(true);
            }, delay);

            return () => clearTimeout(timer);
        }

    }, [color, props.colIndex])

    useEffect(() => {
        if (props.guessCount === props.guessIndex + 1) {
            submitGuess()
        } else {
            setLetter(props.guessIndex === props.guessCount ? props.letter : '')
        }
    }, [props.letter, props.guessCount]);


    return (
        <div
            onClick={() => setFlipped(!flipped)}
            style={{
                backgroundColor: "transparent",
                width: "50px",
                height: "50px",
                perspective: "1000px",
                borderColor: token.colorBorder,
                borderRadius: 12,
                borderWidth: 1,
                boxShadow: token.boxShadow,
                marginTop: token.marginSM
            }}
        >
            <FlipCardInner flipped={flipped}>
                <FlipCardFront backgroundColor={token.colorBgElevated} color={token.colorText}>
                    {letter}
                </FlipCardFront>
                <FlipCardBack backgroundColor={color} color={token.colorText}>
                    {guessedLetter}
                </FlipCardBack>
            </FlipCardInner>
        </div>
    )

}

export default Tile



