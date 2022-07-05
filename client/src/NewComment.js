import React, { useState } from "react"
import { sendComment } from "./services"
import { useOutletContext } from "react-router-dom"

const NewComment = ({ meme_id }) => {
    const [commentToPost, setCommentToPost] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [userId] = useOutletContext()

    const commentChangeHandler = (event) => {
        let title = event.target.value
        setCommentToPost(title)
    }

    const sendCommentHandler = () => {
        if (commentToPost) {
            sendComment(meme_id, userId, commentToPost).then((body) => console.log(body))
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div>
            <button onClick={sendCommentHandler}>Send</button>
            <input onChange={commentChangeHandler} type="text"></input>
            {showErrorMessage && <span style={{ color: "red" }}>no empty comments</span>}
        </div>
    )
}

export default NewComment
