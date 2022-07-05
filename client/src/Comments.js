import React, { useEffect } from "react"
import NewComment from "./NewComment";

const Comments = ({ meme_id }) => {
    const [comments, setComments] = React.useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/comments/${meme_id}`) // fetch pings outwards to API
            .then((result) => result.json())
            .then((body) => setComments(body))
    }, [meme_id])

    return (
        <div>
            <NewComment meme_id={meme_id} />
            {comments.map((comment) => {
                return <div key={comment.id}>{comment.textbody}</div>
            })}
        </div>
    )
}

export default Comments
