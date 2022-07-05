const express = require("express")
const router = express.Router()
const comments = require("../services/comments")
/* 
  Router for /memes/ 
*/
async function wrapErrors(next, fn) {
    try {
        await fn()
    } catch (err) {
        console.error(`Error while getting memes `, err.message)
        next(err)
    }
}

// GET /memes/
router.get("/", async function (req, res, next) {
    await wrapErrors(next, async () => {
        // build through lambda so that the query executed WITHIN the try on line 10
        // await automatically colors the function and upper functions as async
        res.json(await memes.getMultiple()) // response exists and we append to it
        // we NEED await/async anytime we go outside the language runtime (database, filesystem, other servers)
    })
})

router.post("/comment", async (req, res) => {
    // GET is url, POST is url + body
    console.log("Inserting comment: ", req)
    let commentId = await comments.postComment(req.body.meme_id, req.body.user_id, req.body.textbody)
    res.json(commentId)
})

module.exports = router
