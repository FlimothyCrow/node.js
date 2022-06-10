const express = require("express")
const router = express.Router()
const memes = require("../services/memes")
const path = require("path")

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

// GET /memes/meme/1
router.get("/meme/:memeId", async function (req, res, next) {
    await wrapErrors(next, async () => {
        res.json(await memes.getMeme(req.params.memeId))
    })
})

router.get("/img/:memeId", async function (req, res, next) {
    await wrapErrors(next, async () => {
        let memeToReturn = await memes.getMeme(req.params.memeId)
        res.sendFile(path.join(__dirname, "..", "img", "memes", memeToReturn.filename))
    })
})

// GET /memes/upvote/:memeId
router.get("/upvote/:memeId", async function (req, res, next) {
    await wrapErrors(next, async () => {
        let memeId = req.params.memeId
        await memes.upvoteMeme(memeId)
        res.json(await memes.getMeme(memeId))
    })
})

module.exports = router
// comment
