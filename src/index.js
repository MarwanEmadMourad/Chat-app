const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const publicDirectioryPath = path.join(__dirname,"../public")

app.use(express.static(publicDirectioryPath))

io.on("connection" , () =>{
    console.log("New client connection established.")
})

server.listen(5001,()=>{
    console.log("Server is running on port 5001.")
})