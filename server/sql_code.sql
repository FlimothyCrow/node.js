DROP TABLE memeVotes;
DROP TABLE commentVotes;
DROP TABLE comments;
DROP TABLE memes;
DROP TABLE users;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
    PRIMARY KEY (id));
    

CREATE TABLE memes (
	id INT NOT NULL AUTO_INCREMENT,
    filename VARCHAR(255) not null,
    title VARCHAR(255) not null,
    post_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT not null,
    FOREIGN KEY (user_id) REFERENCES users (id),  -- constrains information stored in this table under "user_id" to ONLY IF EXISTS under table USERS
    PRIMARY KEY (id));

CREATE TABLE memeVotes ( -- doesn't need ID or primary key
	user_id INT,
    meme_id INT, 
    upvote BIT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (meme_id) REFERENCES memes (id),
    PRIMARY KEY(user_id, meme_id)
    );
    
CREATE TABLE comments (
	id INT NOT NULL AUTO_INCREMENT,
    meme_id INT not null,
    textbody VARCHAR(255),
	user_id INT not null,
	FOREIGN KEY (user_id) REFERENCES users (id), -- FOREIGN KEY takes two arguments: local column name, required foreign column
    FOREIGN KEY (meme_id) references memes (id),
    PRIMARY KEY (id));
        
CREATE TABLE commentVotes ( -- doesn't need ID or primary key
	user_id INT,
    comment_id INT, 
    upvote BIT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (comment_id) REFERENCES comments (id),
    PRIMARY KEY(user_id, comment_id)
    );


INSERT into users (name) VALUES ('bigCheese420');    
INSERT INTO users (name) VALUES ('flim');
INSERT INTO users (name) VALUES ('SAS');
INSERT INTO memes (filename, title, user_id) VALUES ('dankmeme.jpg', 'lawl star trek', 1);
INSERT INTO memes (filename, title, user_id) VALUES ('mehmname.jpg', 'fall star trek', 2);
INSERT INTO memes (filename, title, user_id) VALUES ('stuff.jpg', 'big cheese', 1);
INSERT INTO memes (filename, title, user_id) VALUES ('glass.jpg', 'big cheese', 2);
INSERT INTO comments (meme_id, textbody, user_id) VALUES (4, 'repost loser', 3);
INSERT INTO comments (meme_id, textbody, user_id) VALUES (3, 'go back to reddit', 2);
INSERT into memeVotes (user_id, meme_id, upvote) VALUES (3, 2, 1);
INSERT into memeVotes (user_id, meme_id, upvote) VALUES (2, 2, 1);
INSERT into memeVotes (user_id, meme_id, upvote) VALUES (1, 2, 0);
INSERT into commentVotes (user_id, comment_id, upvote) VALUES (2, 2, 1);
INSERT into commentVotes (user_id, comment_id, upvote) VALUES (1, 2, 1);

SELECT * FROM commentVotes;

SELECT -- ALWAYS ALIAS YOUR COLUMN NAMES
m.id as meme_id, m.filename, m.title,
m.user_id as op_user_id,
u.name as op_username
FROM memes m 
-- you only need one FROM to start, and it "reaches out" to other tables
LEFT JOIN users u on u.id = m.user_id ;

-- left join means we will get all memes and any upvotes (everything from left table, anything matching logic in right table)
-- memes is the left table, votes is the right 

SELECT 
	m.id as meme_id,
	m.filename,
    m.title,
    m.post_date,
    opUsers.name as op_name,
    opUsers.id as op_id,
    upvoters.id as upvoter_id,
    upvoters.name as upvoter_name,
    v.upvote
FROM memes m 
LEFT JOIN memeVotes v ON m.id = v.meme_id
LEFT JOIN users opUsers ON m.user_id = opUsers.id
LEFT JOIN users upvoters ON v.user_id = upvoters.id;

-- count, group by
SELECT 
	m.id as meme_id,
	m.filename,
    m.title,
    m.post_date,
    opUsers.name as op_name,
    opUsers.id as op_id,
    SUM(CASE v.upvote WHEN 1 THEN 1 ELSE 0 END) AS upvotes,
    SUM(CASE v.upvote WHEN 0 THEN 1 ELSE 0 END) AS downvotes
FROM memes m 
LEFT JOIN memeVotes v ON m.id = v.meme_id
LEFT JOIN users opUsers ON m.user_id = opUsers.id
LEFT JOIN users upvoters ON v.user_id = upvoters.id
-- WHERE m.id = 2
GROUP BY (m.id) 
;






