const express = require("express")
const app = express()
const port = 3001
const memesRouter = require("./routes/memes")
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.get("/", (req, res) => {
    res.json({ message: "ok" }) // res is automatically returned to front end
})
app.use("/memes", memesRouter) // use allows for async returns without setting await
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })
    return
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// $ nodemon