const helper = require("../helper")
// start teesting session with "npm run testWatch" to autorun test suite

test("reshape object", () => {
    expect(
        helper.userResponseConverter([
            {
                meme_id: 1,
                filename: "dankmeme.png",
                title: "lawl star trek",
                upvotes: 0,
                downvotes: 0,
                op_user_id: 1,
                op_username: "flim",
            },
            {
                meme_id: 2,
                filename: "stuff.jpg",
                title: "big cheese",
                upvotes: 0,
                downvotes: 0,
                op_user_id: 1,
                op_username: "flim",
            },
        ])
    ).toEqual({
        op_user_id: 1,
        op_username: "flim",
        memes: [
            { meme_id: 1, filename: "dankmeme.png", title: "lawl star trek", upvotes: 0, downvotes: 0 },
            { meme_id: 2, filename: "stuff.jpg", title: "big cheese", upvotes: 0, downvotes: 0 },
        ],
    })
})

test("reshape objects", () => {
    expect(
        helper.reshapeObject({
            meme_id: 1,
            filename: "dankmeme.png",
            title: "lawl star trek",
            upvotes: 0,
            downvotes: 0,
            op_user_id: 1,
            op_username: "flim",
        })
    ).toEqual({ meme_id: 1, filename: "dankmeme.png", title: "lawl star trek", upvotes: 0, downvotes: 0 })
})
