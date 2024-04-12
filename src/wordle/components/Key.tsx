import React from 'react'
import styled from "styled-components";
import {Col, Typography} from "antd";

interface CorrectKeyType {
    char: string;
    index: number
}

const Key = (props: { letter: string },) => {
    const {letter} = props

    return (
        <Col>
            <StyledKey>
                <Typography.Text>{letter}</Typography.Text>
            </StyledKey>
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