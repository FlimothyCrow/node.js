const db = require("./db")
const helper = require("../helper")

async function getAllUsers() {
    const rows = await db.query(`SELECT * FROM users;`)
    return helper.emptyOrRows(rows)
}

async function getUser(username) {
    //const rows = await db.query(`SELECT * FROM users WHERE name = ?;`, [username]) // write join on user > memes
    const rows = await db.query(
        `SELECT 
        m.id as meme_id, m.filename, m.title, m.upvotes, m.downvotes,
        m.user_id as op_user_id,
        u.name as op_username
        FROM memes m 
        left join users u on u.id = m.user_id 
        WHERE u.name = ?;
        `,
        [username] // left join FROM memes > users means ALL from memes ANY from users
    )
    return helper.userResponseConverter(rows) // query returns an array
}

module.exports = {
    getAllUsers,
    getUser,
}

// SELECT
// m.id as meme_id, m.filename, m.title, m.upvotes, m.downvotes,
// m.user_id as op_user_id,
// u.name as op_username
// FROM memes m
// left join users u on u.id = m.user_id
