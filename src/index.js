const express = require("express")
const path = require("path")
const http = require("http")


const app = express()
const publicDirectioryPath = path.join(__dirname,"../public")

app.use(express.static(publicDirectioryPath))


app.listen(5001,()=>{
    console.log("App is running on port 5001.")
})