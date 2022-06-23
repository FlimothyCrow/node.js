import React from "react"
import "./Meme.css"

const Meme = (props) => {
    // it has to be named props
    return (
        <div>
            <h1>{props.meme.title}</h1>
            <img className="memeImg" src={"http://localhost:3001/memes/img/" + props.meme.filename} alt="hello"></img>
            <h3>posted by{props.meme.op_username}</h3>
            <div>
                {props.meme.upvotes} updoots, {props.meme.downvotes} downdoots
            </div>
        </div>
    )
}

export default Meme

// one route for JSON "http://localhost:3001/memes/meme/${memeinfo}"
// a second route to return the actual file "http://localhost:3001/img/${props.meme.id}"
