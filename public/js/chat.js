const socket = io()

document.querySelector("#text_form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const message = document.querySelector("#message_text_area").value
    socket.emit("message2server",message)
})

socket.on("message2client" , (message) =>{
    console.log(message)
})

document.querySelector("#location_button").addEventListener("click",(e) =>{
    if (!navigator.geolocation) {
        return alert("Your current browser does not support navigator feature.")
    }   

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit("location",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        },()=>{ 
            console.log("Location shared successfully.")
        })
    })
})