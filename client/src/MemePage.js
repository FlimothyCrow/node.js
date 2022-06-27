import React, { useEffect } from "react"
import MemeCard from "./MemeCard"
import { useParams } from "react-router-dom"
import { sendUpdoot } from "./services"

const MemePage = () => {
    const [meme, setMeme] = React.useState(undefined) // setMeme sister function triggers re-render
    let params = useParams()
    const handleUpdoot = (memeId) => {
        sendUpdoot(memeId).then((body) => setMeme(body))
    }
    useEffect(() => {
        fetch(`http://localhost:3001/memes/meme/${params.memeId}`) // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setMeme(body))
    }, [params.memeId])

    // updoot
    // fetch state for single meme
    return (
        <div>
            {params.memeId}
            <MemeCard handleUpdoot={handleUpdoot} meme={meme} />
            {/* render comments */}
            {/* render new comment form */}
        </div>
    )
}

export default MemePage
