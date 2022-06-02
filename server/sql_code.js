// CREATE TABLE users (
// 	id INT NOT NULL AUTO_INCREMENT,
//     name VARCHAR(255),
//     PRIMARY KEY (id));

// CREATE TABLE memes (
// 	id INT NOT NULL AUTO_INCREMENT,
//     filename VARCHAR(255) not null,
//     title VARCHAR(255) not null,
//     upvotes INT not null default 0,
//     downvotes INT not null default 0,
//     user_id INT not null,
//     FOREIGN KEY (user_id) REFERENCES users (id),  -- constrains information stored in this table under "user_id" to ONLY IF EXISTS under table USERS
//     PRIMARY KEY (id));

// CREATE TABLE comments (
// 	id INT NOT NULL AUTO_INCREMENT,
//     meme_id INT not null,
//     textbody VARCHAR(255),
// 	user_id INT not null,
//     upvotes INT not null default 0,
//     downvotes INT not null default 0,
//     FOREIGN KEY (user_id) REFERENCES users (id), -- FOREIGN KEY takes two arguments: local column name, required foreign column
//     FOREIGN KEY (meme_id) references memes (id),
//     PRIMARY KEY (id));

// -- INSERT INTO users (name) VALUES ('flim');
// -- SELECT * FROM users;
// -- INSERT INTO memes (filename, title, user_id) VALUES ('dankmeme.png', 'lawl star trek', 1);
// -- INSERT INTO memes (filename, title, user_id) VALUES ('stuff.jpg', 'big cheese', 1);
// -- INSERT into users (name) VALUES ('bigCheese420');
// -- INSERT INTO comments (meme_id, textbody, user_id) VALUES (2, 'repost', 2);

// SELECT -- ALWAYS ALIAS YOUR COLUMN NAMES
// m.id as meme_id, m.filename, m.title, m.upvotes, m.downvotes,
// m.user_id as op_user_id,
// u.name as op_username,
// c.id as comment_id,
// c.textbody,
// c.user_id as commenter_id,
// u2.name as commenter_username,
// c.upvotes as comment_upvotes,
// c.downvotes as comment_downvotes
// FROM memes m -- you only need one FROM to start, and it "reaches out" to other tables
// left join comments c on m.id = c.meme_id
// left join users u on u.id = m.user_id
// left join users u2 on u2.id = c.user_id
