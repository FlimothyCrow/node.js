import React, { useEffect } from "react"
import "./MemeCard.css"
import Upvote from "./Upvote"

const MemeCard = ({ memeId, updoot }) => {
    const [meme, setMeme] = React.useState([]) // setMeme sister function triggers re-render
    useEffect(() => {
        fetch(`http://localhost:3001/memes/meme/${memeId}`) // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMeme(body))
    }, {})
    // it has to be named props
    return (
        <div className="memeCard">
            <h1 className="memeText">{meme.title}</h1>
            <div className="memeWrapper">
                <img className="memeImg" src={"http://localhost:3001/memes/img/" + meme.filename} alt="hello"></img>
            </div>
            <h3 className="memeText">posted by {meme.op_username}</h3>
            <Upvote updoot={updoot} meme={meme} />
        </div>
    )
}

export default MemeCard

// one route for JSON "http://localhost:3001/memes/meme/${memeinfo}"
// a second route to return the actual file "http://localhost:3001/img/${props.meme.id}"
