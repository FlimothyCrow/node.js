
export function sendUpdoot (memeId) {
    return fetch("http://localhost:3001/memes/upvote/" + memeId) // fetch pings outwards to API
        .then((result) => result.json())
}

// change updoot route to not return anything...? just don't use the return??
// onclick key: updoot += 1 && sendUpdoot(memeId) 
