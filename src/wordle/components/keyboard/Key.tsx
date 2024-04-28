import React from 'react'
import {Button, Col, Typography} from "antd";
import {EnterOutlined, LeftOutlined} from "@ant-design/icons";

const Key = (props: { letter: string },) => {
    const {letter} = props
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

    return (
        <Col >
            {/*<StyledKey style={ isActive ? {backgroundColor: 'blue'} : {}}>*/}
            <Button onClick={() => simulateKeydown()} className="key-button" >
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