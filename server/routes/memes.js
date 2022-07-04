const express = require("express")
const router = express.Router()
const memes = require("../services/memes")
const path = require("path")
const fileUpload = require("express-fileupload")
const { v4: uuidv4 } = require("uuid")
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

router.get("/img/:filename", async function (req, res, next) {
    await wrapErrors(next, async () => {
        res.sendFile(path.join(__dirname, "..", "img", "memes", req.params.filename))
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

router.post("/meme", async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded!" })
    }
    const file = req.files.file
    const title = req.body.title
    const user_id = req.body.user_id

    const uuidFileName = uuidv4()
    console.log("Inserting Meme: " + title + " with filename: " + uuidFileName)
    file.mv(`${__dirname}/../img/memes/${uuidFileName}`, async (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        let memeID = await memes.postMeme(uuidFileName, title, user_id)
        let meme = await memes.getMeme(memeID)
        res.json(meme)
    })
})

module.exports = router
// comment
