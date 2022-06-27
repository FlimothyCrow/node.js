import React, { useEffect } from "react"
// import FileUpload from "./FileUpload"
import MemeCard from "./MemeCard"
import { sendUpdoot } from "./services"
import "./FrontPage.css"

function FrontPage() {
    const [memes, setMemes] = React.useState([]) // setMeme sister function triggers re-render
    const handleUpdoot = (memeId) => {
        sendUpdoot(memeId).then((body) => console.log(body))
    }
    useEffect(() => {
        fetch("http://localhost:3001/memes/") // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMemes(body))
    }, [])
    return (
        <div className="app">
            {memes.map((memeObj, idx) => {
                return <MemeCard key={idx} handleUpdoot={handleUpdoot} meme={memeObj} />
            })}
            {/* <FileUpload /> */}
        </div>
    )
}

export default FrontPage
