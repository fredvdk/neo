const express = require('express')

const app = express()
const port = 3000

app.get("/", (req, res) => {
    //res.send("Welcome my app");
    res.sendFile("/index.html", {root: __dirname});
})

app.listen(port,
    () => {
        console.log(`Listening op port ${port}`)
    })