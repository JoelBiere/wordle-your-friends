import React, {useCallback, useEffect, useState} from "react";
import {Col, message, Row, theme} from "antd";
import {getWordOfTheDay, isWordInList} from '../firebase/database'
import Tile from "./components/tile/Tile";
import Keyboard from "./components/keyboard/Keyboard";
import EndOfGameModal from "./components/feedback/EndOfGameModal";
import styled from "styled-components";

const {useToken} = theme
const Wordle = (props: { theme: 'dark' | 'light' }) => {
    const {token} = useToken()
    const [answer, setAnswer] = useState("")
    const [keysPressed, setKeysPressed] = useState<string[]>([])
    const [guesses, setGuesses] = useState<string[]>([])
    const [messageApi, contextHolder] = message.useMessage();
    const [shakeCurrentRow, setShakeCurrentRow] = useState(false)
    const [shakeKey, setShakeKey] = useState(0); // state to force rerender of the shaking row
    const [endOfGame, setEndOfGame] = useState(false)
    const [won, setWon] = useState(false)
    useEffect(() => {
        if (shakeCurrentRow) {
            setTimeout(() => {
                setShakeCurrentRow(false);
                setShakeKey(prevKey => prevKey + 1); // Increment key to force rerender
            }, 500); // Match the animation duration
        }
    }, [shakeCurrentRow]);

    useEffect(() => {
        (async () => {
            const wordData = await getWordOfTheDay();
            if (wordData && wordData.word) {
                setAnswer(wordData.word);
            }
        })();
    }, []);

    const submitGuess = useCallback(async () => {
        // submit guess
        const guess = keysPressed.join('')
        const validGuess = await isWordInList(guess)
        if (validGuess) {
            console.log("Added to guesses", guess)
            setGuesses((prevGuesses) => [...prevGuesses, guess])

            setKeysPressed([])
        } else {
            console.log("Do not add guess. it wasn't valid word")
            setShakeCurrentRow(true)
            messageApi.warning("Not a word in list.").then(r => console.log(`Not a word in list ${r}`))
        }
    }, [keysPressed, messageApi]);

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.key === "Backspace") {
            setKeysPressed(prevKeys => prevKeys.slice(0, -1));
            console.log("key was backspace")
        }
        if (event.key === "Enter" && keysPressed.length === 5) submitGuess().then(r => console.log("Guess Submitted"))
        else {
            // add key to keypressed, unless keypressed is full
            if (event.key.length === 1 && event.key.match(/[a-z]/i) && keysPressed.length < 5) {
                setKeysPressed(prevKeys => [...prevKeys, event.key.toUpperCase()]);
                console.log("key was", event.key)
            }
        }
    }, [keysPressed, submitGuess]);

    useEffect(() => {
        if (!endOfGame){
            window.addEventListener('keydown', handleKeyPress);
            console.log("keysPressed is now", keysPressed)
            // Cleanup
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [keysPressed, handleKeyPress, endOfGame]);

    const generateEndOfGame = (won: boolean) => {
        console.log("End of game sequence init")
        setEndOfGame(true)
        setWon(won)
    }
    useEffect(() => {
        const guess = guesses[guesses.length - 1]
        const correctGuess = guess?.toUpperCase() === answer?.toUpperCase()
        if( correctGuess || (!correctGuess && guesses.length === 6)){
            // setEndOfGameModalOpen(true)
            generateEndOfGame(correctGuess)
        }
    }, [guesses, answer]);

    return (
        <Container>
            {contextHolder}
            {endOfGame && <EndOfGameModal won={won} guesses={guesses} answer={answer}/>}
            <TilesContainer backgroundColor={token.colorBgLayout}>
                {[...Array(6)].map((_, rowIndex) => (
                    <Row
                        key={rowIndex}
                        wrap={false}
                        gutter={[8, 8]}
                        justify={'center'}
                        className={shakeCurrentRow && guesses.length === rowIndex ? "shake-and-bake" : ""}
                        data-key={shakeKey}
                    >
                        {answer.split("").map((answerLetter, index) => (
                            <Col key={index}> <Tile theme={'light'} answer={answer} guessIndex={rowIndex}
                                                    answerLetter={answerLetter} guessCount={guesses.length}
                                                    letter={keysPressed[index] ? keysPressed[index] : ''}
                                                    colIndex={index}/> </Col>
                        ))}
                    </Row>
                ))}
            </TilesContainer>
            <KeyboardWrapper backgroundColor={token.colorBgLayout}>
                <Keyboard guesses={guesses} answer={answer} theme={props.theme}/>
            </KeyboardWrapper>

        </Container>

    )
}


export default Wordle


const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    //background: black
`;

const TilesContainer =  styled.div<{backgroundColor: string}>`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: ${props => props.backgroundColor};
    margin-bottom: 155px; /* Adjust this value based on the height of KeyboardWrapper */
    //background: red
`;

const KeyboardWrapper = styled.div<{backgroundColor: string}>`
    z-index: 1000;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    flex-shrink: 0;
    background-color: ${props => props.backgroundColor};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    min-height: 155px; /* Fixed height */
`;