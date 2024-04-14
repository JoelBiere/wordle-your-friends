import React from 'react'
import styled from "styled-components";
import {Card} from "antd";


const Tile = (props: {puzzleLetter: string, letter:string}) => {

    return (
        <Card >
            {props.letter}
        </Card>
    )

}

export default Tile

