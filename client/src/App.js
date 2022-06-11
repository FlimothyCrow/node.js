import React, { useEffect } from "react"

function App() {
    const [meme, setMeme] = React.useState({}) // setMeme sister function triggers re-render
    const updoot = (memeID) => {
        fetch("http://localhost:3001/memes/upvote/" + memeID) // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMeme(body))
    }
    useEffect(() => {
        fetch("http://localhost:3001/memes/meme/" + "1") // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMeme(body))
    }, [])

    console.log(meme)
    return (
        <div className="app">
            <h1>filename is equal to {meme.filename}</h1>
            <h2>the title of the meme is {meme.title}</h2>
            <h3>thank you to op {meme.user_id}</h3>
            <div>has {meme.upvotes} many updoots</div>{" "}
            <button type="button" onClick={() => updoot(meme.id)}>
                Click for updoot
            </button>
            <img src={"http://localhost:3001/memes/img/" + meme.id} alt="hello"></img>
        </div>
    )
}

export default App
