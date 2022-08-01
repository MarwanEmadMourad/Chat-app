const socket = io()

document.querySelector("#text_form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const message = document.querySelector("#message_text_area").value
    socket.emit("message2server",message)
})

socket.on("message2client" , (message) =>{
    console.log(message)
})