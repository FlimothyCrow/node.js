import React from "react"
import "./MemeCard.css"

const Upvote = ({ meme, handleUpdoot }) => {
    // it has to be named props
    // we can "unpack" prop keys to call them directly, it doesn't have to contain the entire prop
    return (
        <div className="memeCard">
            <div className="memeText">
                <button onClick={() => handleUpdoot(meme.id)}>Updoot</button>
                {meme.upvotes} updoots, {meme.downvotes} downdoots
            </div>
        </div>
    )
}

// lambda prevents the code from executing until onClick

export default Upvote
