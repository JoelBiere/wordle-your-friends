import React from 'react'
import Key from "./Key";
import {Row} from "antd";
import styled from "styled-components";

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'
]
const Keyboard = (props: { guesses: string[], answer: string, theme: 'light' | 'dark' }) => {
    return (
        <>
            <KeyboardRow>
                {keys.slice(0, 10).map(char => (
                    <Key key={char} letter={char} guesses={props.guesses} answer={props.answer} theme={props.theme}/>
                ))}
            </KeyboardRow>
            <KeyboardRow>
                {keys.slice(10, 19).map(char => (
                    <Key key={char} letter={char} guesses={props.guesses} answer={props.answer} theme={props.theme}/>
                ))}
            </KeyboardRow>
            <KeyboardRow>
                {keys.slice(19, 28).map(char => (
                    <Key key={char} letter={char} guesses={props.guesses} answer={props.answer} theme={props.theme}/>
                ))}
            </KeyboardRow>
        </>
    );
};

export default Keyboard;

const KeyboardRow = (props: { children: any }) => (
    <RowContainer>
        {props.children}
    </RowContainer>
);

const RowContainer = styled(Row)`
    display: flex;
    justify-content: center;
    margin-top: 8px;
    flex-wrap: nowrap;
    width: 100%;
`;