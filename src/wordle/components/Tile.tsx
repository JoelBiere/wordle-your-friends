import React, {useEffect, useState} from 'react'
import {Card} from "antd";
import {CSSTransition} from 'react-transition-group';
import styled from "styled-components";

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
        <FlipCard onClick={() => setFlipped(!flipped)}>
            <FlipCardInner flipped={flipped}>
                <FlipCardFront>
                    {letter}
                </FlipCardFront>
                <FlipCardBack color={color}>
                    {guessedLetter}
                </FlipCardBack>
            </FlipCardInner>
        </FlipCard>
    )

}

export default Tile

// Styled components
const FlipCard = styled.div`
    background-color: transparent;
    width: 50px;
    height: 50px;
    border: 1px solid #f1f1f1;
    perspective: 1000px;
`;



const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const FlipCardFront = styled(CardFace)`
  background-color: #bbb;
  color: black;
`;

interface FlippedCardBackProps {
    color: string
}

const FlipCardBack = styled(CardFace)<FlippedCardBackProps>`
  background-color: ${props => props.color};
  color: white;
  transform: rotateY(180deg);
`;
// Define an interface for the props
interface FlipCardInnerProps {
    flipped: boolean;
}
const FlipCardInner = styled.div<FlipCardInnerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;