import React from 'react'
import Key from "./Key";
import {Row} from "antd";

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Enter','Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'
]
const Keyboard = (props: {guesses: string[], answer: string, theme: 'light'|'dark'}) => {


    return (
        <>
            <KeyboardRow>
                {keys.slice(0, 10).map(char => <Key letter={char} key={char} guesses={props.guesses} answer={props.answer} theme={props.theme}/>)}
            </KeyboardRow>
            <KeyboardRow>
                {keys.slice(10, 19).map(char => <Key letter={char} key={char} guesses={props.guesses} answer={props.answer} theme={props.theme}/>)}
            </KeyboardRow>
            <KeyboardRow>
                {keys.slice(19, 28).map(char => <Key letter={char} key={char} guesses={props.guesses} answer={props.answer} theme={props.theme}/>)}
            </KeyboardRow>
        </>
    )
}

export default Keyboard

const KeyboardRow = ({...props}) => <Row style={{marginTop: '8px'}} wrap={false} justify={'center'} gutter={8}>{props.children}</Row>