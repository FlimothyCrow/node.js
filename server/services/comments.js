const db = require("./db")
const helper = require("../helper")
const config = require("../config")

// never let the code modify the structure of the database
async function getMultipleComments(meme_id) {
    const rows = await db.query(`SELECT * FROM comments where meme_id = ? ;`, [meme_id])
    return helper.emptyOrRows(rows)
}

async function postComment(meme_id, user_id, textbody) {
    const result = await db.query(
        `INSERT INTO comments 
      (meme_id, user_id, textbody) 
      VALUES (?, ?, ?)
      `,
        [meme_id, user_id, textbody]
    )
    return result.insertId // database query returns primary key from the new meme row
}

module.exports = {
    getMultipleComments,
    postComment,
}
