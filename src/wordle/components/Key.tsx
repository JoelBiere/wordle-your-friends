import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Col, Typography} from "antd";
import {Simulate} from "react-dom/test-utils";
import keyPress = Simulate.keyPress;
interface CorrectKeyType {
    char: string;
    index: number
}

const Key = (props: { letter: string },) => {
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        // Function to handle the key press event
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === letter.toLowerCase()) {
                console.log(`Key '${letter}' was pressed`);
                setIsActive(true)
            }
        };
        const handleKeyup = (event: KeyboardEvent) => {
            setIsActive(false)
        }

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyup);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, [props.letter])
    const {letter} = props
    return (
        <Col>
            <StyledKey style={ isActive ? {backgroundColor: 'blue'} : {}}>
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