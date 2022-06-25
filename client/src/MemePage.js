import React, { useEffect } from "react"
import MemeCard from "./MemeCard"
import { useParams } from "react-router-dom"
import { sendUpdoot } from "./services"

const MemePage = () => {
    const [meme, setMeme] = React.useState(undefined) // setMeme sister function triggers re-render
    let params = useParams()
    useEffect(() => {
        fetch(`http://localhost:3001/memes/meme/${params.memeId}`) // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMeme(body))
    }, [])

    // updoot
    // fetch state for single meme
    return (
        <div>
            {params.memeId}
            <MemeCard sendUpdoot={sendUpdoot} meme={meme} />
            {/* render comments */}
            {/* render new comment form */}
        </div>
    )
}

export default MemePage
