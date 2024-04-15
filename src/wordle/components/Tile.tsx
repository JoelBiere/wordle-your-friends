import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Card} from "antd";


const Tile = (props: {puzzleLetter: string, letter:string, guessIndex: number, guessCount: number}) => {

    const [letter, setLetter] = useState('')
    const [ guessedLetter, setGuessedLetter] = useState('')
    useEffect(() => {
        setLetter(props.guessIndex === props.guessCount ? props.letter: '')
        if(props.guessCount === props.guessIndex + 1) {
            // user just submitted guess, permantly display
            setGuessedLetter(letter)
        }
    }, [props.letter, props.guessCount]);

    return (
        <Card >
            {guessedLetter ? guessedLetter : letter}
        </Card>
    )

}

export default Tile

