import React from "react"
import "./MemeCard.css"
import Upvote from "./Upvote"

const MemeCard = ({ meme, handleUpdoot }) => {
    // it has to be named props

    return (
        <div className="memeCard">
            {meme && (
                <>
                    <h1 className="memeText">{meme.title}</h1>
                    <div className="memeWrapper">
                        <img
                            className="memeImg"
                            src={"http://localhost:3001/memes/img/" + meme.filename}
                            alt="hello"
                        ></img>
                    </div>
                    <h3 className="memeText">posted by {meme.op_username}</h3>
                    <Upvote handleUpdoot={handleUpdoot} meme={meme} />
                </>
            )}
        </div>
    )
}

// onclick key: updoot += 1 && sendUpdoot(memeId)
// handleUpdoot(memeId) doesn't return anything from that API
// Upvote.js currently calls sendUpdoot(memeId) successfully updating database
// it needs to modify the meme object, send it back to MemeCard, then call setMeme(newMemeObj)

export default MemeCard

// one route for JSON "http://localhost:3001/memes/meme/${memeinfo}"
// a second route to return the actual file "http://localhost:3001/img/${props.meme.id}"
