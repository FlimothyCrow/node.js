const db = require("./db")
const helper = require("../helper")
const config = require("../config")

async function upvoteMeme(memeId, userId) {
    let sql = `INSERT INTO memeVotes (meme_id, user_id, upvote) VALUES (?, ?, 1)`;
    await db.query(sql, [memeId, userId]);
}

function getMemeQuery(whereClause="") {
    return `
        SELECT 
            m.id,
            m.filename,
            m.title,
            m.post_date,
            opUsers.name as op_username,
            opUsers.id as user_id,
            SUM(CASE v.upvote WHEN 1 THEN 1 ELSE 0 END) AS upvotes,
            SUM(CASE v.upvote WHEN 0 THEN 1 ELSE 0 END) AS downvotes
        FROM memes m 
        LEFT JOIN memeVotes v ON m.id = v.meme_id
        LEFT JOIN users opUsers ON m.user_id = opUsers.id
        ${whereClause}
        GROUP BY (m.id) 
    `;
}

async function getMeme(memeId) {
    let query = getMemeQuery(`WHERE m.id = ?`)
    console.log(query)
    const rows = await db.query(query, [memeId])
    return rows.length === 1 ? rows[0] : {} // query returns an array
}

// never let the code modify the structure of the database
async function getMultiple() {
    const rows = await db.query(getMemeQuery())
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
