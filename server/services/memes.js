const db = require("./db")
const helper = require("../helper")
const config = require("../config")

async function upvoteMeme(memeId) {
    // await db.query(`UPDATE memes SET upvotes = upvotes + 1 WHERE id = ${memeId};`)
}

async function getMeme(memeId) {
    const rows = await db.query(
        `
    SELECT 
    m.id, m.filename, m.title, 
    0 as upvotes, 
    0 as downvotes,
    m.user_id,
    u.name as op_username
    FROM memes m 
    left join users u on u.id = m.user_id  
    WHERE m.id = ?;`,
        [memeId]
    )
    return rows.length === 1 ? rows[0] : {} // query returns an array
}
// never let the code modify the structure of the database
async function getMultiple() {
    const rows = await db.query(`
    SELECT 
    m.id, m.filename, m.title, 
    0 as upvotes, 
    0 as downvotes,
    m.user_id,
    u.name as op_username
    FROM memes m 
    left join users u on u.id = m.user_id ;
    `)
    return helper.emptyOrRows(rows)
}

async function postMeme(filename, title, user_id) {
    const result = await db.query(
        `INSERT INTO memes 
      (filename, title, user_id) 
      VALUES (?, ?, ?)
      `,
        [filename, title, user_id]
    )
    return result.insertId // database query returns primary key from the new meme row
}

module.exports = {
    getMultiple,
    getMeme,
    upvoteMeme,
    postMeme,
}
