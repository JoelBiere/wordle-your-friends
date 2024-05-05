import React, {useState} from 'react'
import {Modal} from "antd";

const EndOfGameModal = (props: { won: boolean, guesses: string[], answer: string }) => {

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        console.log("END OF GAME - RESET TILES")
    }

    return (
        <Modal
            open={open}
            onCancel={handleClose}
        >
            {props.won ? "WIN!" : "Lose!"}
        </Modal>
    )
}

export default EndOfGameModal