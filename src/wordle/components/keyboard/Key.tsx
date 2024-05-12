import React, {useEffect, useState} from 'react'
import {Button, Col, theme, Typography} from "antd";
import {EnterOutlined, LeftOutlined} from "@ant-design/icons";
import {ResultColor} from "../tile/Styles";

const {useToken} = theme;

const Key = (props: { letter: string, guesses: string[], answer: string, theme: "light"| "dark" },) => {
    const {letter, guesses, answer} = props
    const {token} = useToken()

    const [keyColor, setKeyColor] = useState<string>("")


    const simulateKeydown = () => {
        const event = new KeyboardEvent('keydown', {key: letter});
        window.dispatchEvent(event);
    };

    const renderLetter = (char: string) => {
        if(char === "Backspace"){
            return <LeftOutlined />
        }
        if(char === "Enter"){
            return <EnterOutlined  />
        }
        return char
    }

    useEffect(() => {
        guesses.forEach(guess => {
            if(guess.includes(letter)){
                if(answer.includes(letter)){
                    let correct = false
                    answer.split('').forEach((char, index) => {
                        if(char === guess[index]){
                            correct = true
                            setKeyColor(ResultColor[props.theme].correct)
                            return
                        }
                    })
                    if(!correct){
                        setKeyColor(ResultColor[props.theme].close)
                    }

                }
                else {
                    setKeyColor(ResultColor[props.theme].wrong)
                    return
                }
            }
        })
    }, [guesses, answer, letter,theme]);
    return (
        <Col >
            {/*<StyledKey style={ isActive ? {backgroundColor: 'blue'} : {}}>*/}
            <Button onClick={() => simulateKeydown()} className="key-button" size={'large'} style={{minHeight: '50px', minWidth: '30px', backgroundColor: keyColor ? keyColor : token.colorBgContainer}} >
                <Typography.Text>{renderLetter(letter)}</Typography.Text>
            </Button>
            {/*</StyledKey>*/}
        </Col>

    )
}

export default Key


// const StyledKey = styled.div`
//     background-color: beige;
//     border: cadetblue 1px solid;
//     border-radius: 5px;
//     width: 40px;
//     height: 40px;
//     display: flex;
//     text-align: center;
//     align-items: center;
//     justify-content: center;
// `