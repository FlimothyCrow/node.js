import React, { useEffect } from "react"
// import newMeme from "./NewMeme"
import MemeCard from "./MemeCard"
import { replaceById } from "./helpers"
import { sendUpdoot } from "./services"
import "./FrontPage.css"
import { useOutletContext } from "react-router-dom"

function FrontPage() {
    const [userId] = useOutletContext()

    const [memes, setMemes] = React.useState([]) // setMeme sister function triggers re-render
    const handleUpdoot = (memeId) => {
        sendUpdoot(memeId).then((body) => {
            console.log(body)
            setMemes(replaceById(memes, body))
        })
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
            {/* <NewMeme /> */}
        </div>
    )
}

export default FrontPage
