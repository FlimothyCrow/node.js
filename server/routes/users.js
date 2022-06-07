const express = require("express")
const router = express.Router()
const users = require("../services/users")

/* 
  Router for /memes/ 
*/

async function wrapErrors(fn) {
    try {
        await fn()
    } catch (err) {
        console.error(`Error while getting memes `, err.message)
        next(err)
    }
}

// GET /memes/
router.get("/", async function (req, res, next) {
    // get function defines response
    await wrapErrors(async () => {
        // build through lambda so that the query executed WITHIN the try on line 10
        // await automatically colors the function and upper functions as async
        res.json(await users.getAllUsers()) // response exists and we append to it
        // we NEED await/async anytime we go outside the language runtime (database, filesystem, other servers)
    })
})

module.exports = router
