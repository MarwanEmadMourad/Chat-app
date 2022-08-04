const express = require("express")
const path = require("path")
const http = require("http")
const socketio = require("socket.io")
const {generateMessage} = require("./utils/messages")

const app = express()
const server = http.createServer(app)
const io = socketio(server)


const publicDirectioryPath = path.join(__dirname,"../public")

app.use(express.static(publicDirectioryPath))

io.on("connection" , (socket) =>{
    console.log("New client connection established.")

    socket.emit("message2client" , generateMessage("Welcome!"))
    socket.broadcast.emit("message2client",generateMessage("New member joined the chat."))

    socket.on("message2server",(message,cb)=>{
        io.emit("message2client",generateMessage(message))
        cb()
    })
    socket.on("location",(pos , cb)=>{
        const url = `https://google.com/maps?q=${pos.latitude},${pos.longitude}`
        io.emit("location2client",{
            url,
            createdAt:new Date().getTime()
        })
        cb()
    })

    socket.on("disconnect",()=>{
        io.emit("message2client",generateMessage("A member has left the chat."))
    })
})

server.listen(5001,()=>{
    console.log("Server is running on port 5001.")
})