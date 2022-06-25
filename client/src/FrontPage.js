import React, { useEffect } from "react"
// import FileUpload from "./FileUpload"
import MemeCard from "./MemeCard"
import { sendUpdoot } from "./services"
import "./FrontPage.css"

function FrontPage() {
    const [memes, setMemes] = React.useState([]) // setMeme sister function triggers re-render
    const updoot = (memeId) => {
        sendUpdoot(memeId).then((body) => setMemes(body))
    }
    useEffect(() => {
        fetch("http://localhost:3001/memes/") // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMemes(body))
    }, [])
    console.log(memes)
    return (
        <div className="app">
            {memes.map((memeObj, idx) => {
                return <MemeCard key={idx} updoot={updoot} meme={memeObj} />
            })}
            {/* <FileUpload /> */}
        </div>
    )
}

export default FrontPage
