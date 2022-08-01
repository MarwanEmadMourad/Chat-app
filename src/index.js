const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const publicDirectioryPath = path.join(__dirname,"../public")

app.use(express.static(publicDirectioryPath))

io.on("connection" , (socket) =>{
    console.log("New client connection established.")
    socket.emit("message2client" , "Welcome!")
    socket.on("message2server",(message)=>{
        io.emit("message2client",message)
    })
})

server.listen(5001,()=>{
    console.log("Server is running on port 5001.")
})