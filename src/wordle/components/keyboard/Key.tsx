import React, {useEffect, useState} from 'react'
import {Col, theme, Typography} from "antd";
import {EnterOutlined, LeftOutlined} from "@ant-design/icons";
import {ResultColor} from "../tile/Styles";

const {useToken} = theme;

const Key = (props: { letter: string, guesses: string[], answer: string, theme: "light" | "dark" },) => {
    const {letter, guesses, answer} = props
    const {token} = useToken()

    const [keyColor, setKeyColor] = useState<string>("")


    const simulateKeydown = () => {
        const event = new KeyboardEvent('keydown', {key: letter});
        window.dispatchEvent(event);
    };

    const renderLetter = (char: string) => {
        if (char === "Backspace") {
            return <LeftOutlined/>
        }
        if (char === "Enter") {
            return <EnterOutlined/>
        }
        return char
    }

    useEffect(() => {

        let found = false;
        let close = false
        let correctPosition = false;

        guesses.forEach(guess => {
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] === letter) {
                    found = true;
                    if (answer.includes(letter)) {
                        close = true
                        if (answer[i] === letter) {
                            correctPosition = true;
                            break; // Stop checking further since it's correct in this guess
                        }
                    }

                }
            }
        });

        if (correctPosition) {
            setKeyColor(ResultColor[props.theme].correct); // Green if correct position
        } else if (close) {
            setKeyColor(ResultColor[props.theme].close); // Yellow if answer includes letter but not correct position
        } else if (found) {
            setKeyColor(ResultColor[props.theme].wrong); // Gray if answer does not include
        }

    }, [guesses, answer, letter, props.theme]);

    return (
        <button className="key-button" style={{backgroundColor: keyColor ? keyColor : token.colorBgContainer}}
             onClick={() => simulateKeydown()} key={props.letter}>
            <Typography.Text style={{ color: keyColor ? 'white' : token.colorText}}>{renderLetter(letter)}</Typography.Text>

        </button>

    )
}

export default Key

