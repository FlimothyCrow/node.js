export function sendUpdoot(memeId) {
    return fetch("http://localhost:3001/memes/upvote/" + memeId) // fetch pings outwards to API
        .then((result) => result.json())
}

export function sendComment(meme_id, user_id, textbody) {
    return fetch("http://localhost:3001/comments/comment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ meme_id: meme_id, user_id: user_id, textbody: textbody }), // syntax for keys and values being identical
    }) // fetch pings outwards to API
        .then((result) => result.json())
}
