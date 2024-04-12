import React, {useEffect, useState} from "react";
import {Col, Flex, Row} from "antd";
import {getWordOfTheDay} from '../firebase/database'
import Tile from "./components/Tile";
import Keyboard from "./components/Keyboard";

const Wordle = (props: any) => {

    const [puzzle, setPuzzle] = useState("")

    useEffect(() => {
        (async () => {
            const wordData = await getWordOfTheDay();
            if (wordData && wordData.word) {
                setPuzzle(wordData.word);
            }
        })();
    }, []);


    return (
        <div style={{height: "100%", display: 'flex', justifyContent: 'start', flexDirection: 'column'}}>
            <div style={{flexGrow: 1}}>
            {[...Array(6)].map((_, rowIndex) => (
                <Row key={rowIndex} wrap={false} gutter={[8, 8]} justify={'center'}>
                    {puzzle.split("").map((letter, index) => (
                        <Col key={index}> <Tile letter={letter}/> </Col>
                    ))}
                </Row>
            ))}
            </div>
            <Keyboard puzzle={puzzle}/>
        </div>
    )
}


export default Wordle