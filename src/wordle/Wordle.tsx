import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import {getWordOfTheDay} from '../firebase/database'
import Tile from "./components/Tile";
import Keyboard from "./components/Keyboard";

const Wordle = (props: {theme: 'dark'| 'light'}) => {

    const [answer, setAnswer] = useState("")
    const [keysPressed, setKeysPressed] = useState<string[]>([])
    const [guesses, setGuesses] = useState<string[]>([])

    useEffect(() => {
        (async () => {
            const wordData = await getWordOfTheDay();
            if (wordData && wordData.word) {
                setAnswer(wordData.word);
            }
        })();
    }, []);


    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Backspace") {
                setKeysPressed(prevKeys => prevKeys.slice(0, -1));
                console.log("key was backspace")
            }
            if (event.key === "Enter" && keysPressed.length === 5) {
                console.log("Added to guesses", keysPressed.join(''))
                setGuesses([...guesses, keysPressed.join('')])
                setKeysPressed([])
            } else {
                // add key to keypressed, unless keypressed is full
                if (event.key.length === 1 && event.key.match(/[a-z]/i) && keysPressed.length < 5) {
                    setKeysPressed(prevKeys => [...prevKeys, event.key.toUpperCase()]);
                    console.log("key was", event.key)
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        console.log("keysPressed is now", keysPressed)
        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [keysPressed]);

    return (
        <div style={{height: "100%", display: 'flex', justifyContent: 'start', flexDirection: 'column'}}>
            <div style={{flexGrow: 1}}>
                {[...Array(6)].map((_, rowIndex) => (
                    <Row key={rowIndex} wrap={false} gutter={[8, 8]} justify={'center'}>
                        {answer.split("").map((answerLetter, index) => (
                            <Col key={index}> <Tile theme={'light'} answer={answer} guessIndex={rowIndex}
                                                    answerLetter={answerLetter} guessCount={guesses.length}
                                                    letter={keysPressed[index] ? keysPressed[index] : ''} colIndex={index}/> </Col>
                        ))}
                    </Row>
                ))}
            </div>
            <Keyboard puzzle={answer}/>
        </div>
    )
}


export default Wordle