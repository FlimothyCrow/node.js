import React from "react"
import MemeCard from "./MemeCard"
import { useParams } from "react-router-dom"
import { sendUpdoot } from "./services"

const MemePage = () => {
    let params = useParams()
    // updoot
    // fetch state for single meme
    return (
        <div>
            {params.memeId}
            <MemeCard updoot={sendUpdoot} memeId={params.memeId} />
            {/* render comments */}
            {/* render new comment form */}
        </div>
    )
}

export default MemePage
