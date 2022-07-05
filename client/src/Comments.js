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
/*
  <FrontPage />
        GET /memes/
        POST /memes/upvote/{meme.id}
        <MemeCard meme upvote comments={false} />[]
            <Upvote upvote />

  <MemePage />
        GET /memes/meme/${params.memeId}
        POST /memes/upvote/{meme.id}
        <MemeCard meme upvote />
            <Upvote upvote />
            <Comments meme_id />
                GET /comments/${meme_id}
                POST /comments/delete/comment_id
                POST /comments/edit/comment_id
                <NewComment />
                    POST /comments/comment

  <MemePage />
        GET /memes/meme/${params.memeId}
        POST /memes/upvote/{meme.id}
        GET /comments/${meme_id}
        POST /comments/delete/comment_id
        POST /comments/edit/comment_id
        POST /comments/comment
        <MemeCard meme upvote
            <Upvote upvote />
          >
            <Comments upvoteComment deleteComment editComment comments />
            <NewComment makeComment  />
        </MemeCard>


*/