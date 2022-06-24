import React from "react"
import "./MemeCard.css"

const Upvote = ({ meme, updoot }) => {
    // it has to be named props
    // we can "unpack" prop keys to call them directly, it doesn't have to contain the entire prop
    console.log(meme)
    return (
        <div className="memeCard">
            <div className="memeText">
                <button onClick={() => updoot(meme.id)}>things</button>
                {meme.upvotes} updoots, {meme.downvotes} downdoots
            </div>
        </div>
    )
}

// lambda prevents the code from executing until onClick

export default Upvote
