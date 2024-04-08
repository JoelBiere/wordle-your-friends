import React, {useEffect} from "react";
import {Col, Flex, Row} from "antd";
import Tile from "./components/Tile";
import axios from "axios";
import dayjs from "dayjs";
import {generateWordleWords} from "../firebase/data-seeder";


const Wordle = (props: any) => {

    const puzzle = "QUEST"

    useEffect(() => {
        const words = generateWordleWords()
        console.log(words)
        const requestUrl = `https://wordle-game-api1.p.rapidapi.com/word`

        axios.post(requestUrl, {
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'bf3dc115dbmshc88e8b30a68ec12p16e92ejsn6ae13e11f16c',
                'X-RapidAPI-Host': 'wordle-game-api1.p.rapidapi.com'
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })

    },[])
    return (
        <Flex justify={'center'}>
            <Row gutter={[8,8]}>
                {puzzle.split("").map(letter =><Col> <Tile letter={letter} /> </Col>)}
            </Row>
        </Flex>
    )
}

export default Wordle