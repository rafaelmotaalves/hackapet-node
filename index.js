let express = require("express")
let bodyParser = require("body-parser")

let app = express()
let PORT = 3000

let dvdRoutes = require("./routes/dvd")

app.use(bodyParser.json())

app.use("/dvds", dvdRoutes)

app.listen(PORT, function() {
    console.log("Running app on port " + PORT)
})