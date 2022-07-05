import React, { useState } from "react"
import { sendComment } from "./services"
import { useOutletContext } from "react-router-dom"

const Comments = ({ meme_id }) => {
    const [comment, setComment] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [userId] = useOutletContext()

    const commentChangeHandler = (event) => {
        let title = event.target.value
        setComment(title)
    }

    const sendCommentHandler = () => {
        if (comment) {
            sendComment(meme_id, userId, comment).then((body) => console.log(body))
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div>
            <button onClick={sendCommentHandler}>Send</button>
            <input onChange={commentChangeHandler} type="text"></input>
            {showErrorMessage && <span style={{color:"red"}}>no empty comments</span>}
        </div>
    )
}

export default Comments
