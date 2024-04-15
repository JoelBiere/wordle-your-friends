import React from 'react'
import styled from "styled-components";
import {Button, Col, Typography} from "antd";
import {LeftOutlined} from "@ant-design/icons";

const Key = (props: { letter: string },) => {
    const {letter} = props
    const simulateKeydown = () => {
        const event = new KeyboardEvent('keydown', {key: letter});
        window.dispatchEvent(event);
    };

    return (
        <Col>
            {/*<StyledKey style={ isActive ? {backgroundColor: 'blue'} : {}}>*/}
            <Button onClick={() => simulateKeydown()}>
                <Typography.Text>{letter !== "Backspace" ? letter : <LeftOutlined />}</Typography.Text>
            </Button>
            {/*</StyledKey>*/}
        </Col>

    )
}

export default Key


const StyledKey = styled.div`
    background-color: beige;
    border: cadetblue 1px solid;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
`