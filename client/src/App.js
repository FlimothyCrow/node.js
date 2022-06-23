import React, { useEffect } from "react"
import FileUpload from "./FileUpload"
import Meme from "./Meme"
import "./App.css"

function App() {
    const [memes, setMemes] = React.useState([]) // setMeme sister function triggers re-render
    const updoot = (memeID) => {
        fetch("http://localhost:3001/memes/upvote/" + memeID) // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMemes(body))
    }
    useEffect(() => {
        fetch("http://localhost:3001/memes/") // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMemes(body))
    }, [])
    console.log(memes)
    return (
        <div className="app">
            {memes.map((memeObj) => {
                return <Meme meme={memeObj} />
            })}
            {/* <FileUpload /> */}
        </div>
    )
}

export default App
