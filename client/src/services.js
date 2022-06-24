
export function sendUpdoot (memeId) {
    return fetch("http://localhost:3001/memes/upvote/" + memeId) // fetch pings outwards to API
        .then((result) => result.json())
}