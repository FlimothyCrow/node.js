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
    const rows = await db.query(`SELECT -- ALWAYS ALIAS YOUR COLUMN NAMES
    m.id, m.filename, m.title, m.upvotes, m.downvotes,
    m.user_id,
    u.name as op_username
    FROM memes m -- you only need one FROM to start, and it "reaches out" to other tables
    left join users u on u.id = m.user_id ;
    `)
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
