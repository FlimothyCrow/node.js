const express = require("express")
const router = express.Router()
const memes = require("../services/memes")

/* GET memes. */
router.get("/", async function (req, res, next) {
    try {
        // await automatically colors the function and upper functions as async
        res.json(await memes.getMultiple(req.query.page)) // response exists and we append to it
        // we NEED await/async anytime we go outside the language runtime (database, filesystem, other servers)
    } catch (err) {
        console.error(`Error while getting memes `, err.message)
        next(err)
    }
})

module.exports = router
// comment
