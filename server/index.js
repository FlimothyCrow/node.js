const express = require("express")
const app = express()
const port = 3001
const memesRouter = require("./routes/memes")
const usersRouter = require("./routes/users")
const commentsRouter = require("./routes/comments")
const fileUpload = require("express-fileupload")
const path = require("path")
var cors = require("cors")

// request is shape as {}
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/index.html"))
//     console.log(req.route.path) // res is automatically returned to front end
// })

app.use("/comments", commentsRouter)

app.use("/memes", memesRouter) // use allows for async returns without setting await
/* Error handler middleware */

app.use("/users", usersRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
    return
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// the response is IMPLICITLY returned up to the front end

// $ nodemon
