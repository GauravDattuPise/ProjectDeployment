const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route")
const multer = require("multer")
const app = express()

var cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(multer().any())

mongoose.set('strictQuery', true) //to avoid deprication warning

mongoose.connect("mongodb+srv://gauravpise87:Gaurav2001@gauravdb.crgpvot.mongodb.net/GauravDBProject5", {
    useNewUrlParser: true,
})
    .then(() => console.log("DB is Connected"))
    .catch(error => console.log(error))

app.use("/", route)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})