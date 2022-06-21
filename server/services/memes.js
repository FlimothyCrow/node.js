const db = require("./db")
const helper = require("../helper")
const config = require("../config")

async function upvoteMeme(memeId) {
    await db.query(`UPDATE memes SET upvotes = upvotes + 1 WHERE id = ${memeId};`)
}

async function getMeme(memeId) {
    const rows = await db.query(`SELECT * FROM memes WHERE id = ${memeId};`)
    return rows.length === 1 ? rows[0] : {} // query returns an array
}

async function getMultiple() {
    const rows = await db.query(`SELECT * FROM memes;`)
    return helper.emptyOrRows(rows)
}

async function postMeme(filename) {
    const result = await db.query(
        `INSERT INTO memes 
      (filename, title, user_id) 
      VALUES (?, ?, ?)
      `,
        [filename, "test0", 1]
    )
    return result.insertId
}

module.exports = {
    getMultiple,
    getMeme,
    upvoteMeme,
    postMeme,
}
