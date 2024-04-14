import React from 'react'
import Key from "./Key";
import {Row} from "antd";

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
]
const Keyboard = (props: { puzzle: string }) => {


    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', marginTop:'auto'}}>
            <KeyboardRow>
                {keys.slice(0, 10).map(char => <Key letter={char} key={char}/>)}
            </KeyboardRow>
            <KeyboardRow>
                {keys.slice(10, 19).map(char => <Key letter={char} key={char}/>)}
            </KeyboardRow>
            <KeyboardRow>
                {keys.slice(19, 26).map(char => <Key letter={char} key={char}/>)}
            </KeyboardRow>
        </div>
    )
}

export default Keyboard

const KeyboardRow = ({...props}) => <Row wrap={false} justify={'center'} gutter={8}>{props.children}</Row>