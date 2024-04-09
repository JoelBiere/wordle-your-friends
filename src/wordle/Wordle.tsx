import React, {useEffect, useState} from "react";
import {Button, Col, Flex, Row} from "antd";
import {doc, getDoc} from "firebase/firestore";
import {db} from '../firebase/database-config'
import {seedData} from "../firebase/data-seeder";
import Tile from "./components/Tile";


const getWordOfTheDay = async () => {

    const docRef = doc(db, "words", "2024-04-08");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

const Wordle = (props: any) => {

    const [puzzle, setPuzzle] = useState("")

    useEffect(() => {
        (async () => {
            const wordData = await getWordOfTheDay();
            if (wordData && wordData.word) {
                setPuzzle(wordData.word);
            }
        })();
    }, []); // The empty dependency array ensures this effect runs only once on mount
    return (
        <Flex justify={'center'}>
            {/*<Button onClick={() => seedData()}>Data Seeder</Button>*/}
            <Row gutter={[8, 8]}>
                {puzzle.split("").map((letter, index) => <Col key={index}> <Tile letter={letter}/> </Col>)}
            </Row>
        </Flex>

    )
}

export default Wordle