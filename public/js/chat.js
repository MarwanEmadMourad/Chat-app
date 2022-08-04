const socket = io()
const text_form = document.querySelector("#text_form") ;
const input_text = document.querySelector("#message_text_area");
const send_button = document.querySelector("#send_button")
const send_location_button = document.querySelector("#location_button")

text_form.addEventListener("submit",(e)=>{
    e.preventDefault()
    send_button.setAttribute("disabled","disabled")

    const message = input_text.value
    socket.emit("message2server",message,()=>{
        send_button.removeAttribute("disabled")
        input_text.value = ""
        input_text.focus()

        console.log("Message delivered")
    })
})

socket.on("message2client" , (message) =>{
    console.log(message)
})

send_location_button.addEventListener("click",(e) =>{

    if (!navigator.geolocation) {
        return alert("Your current browser does not support navigator feature.")
    }   
    // disabling the location button until location is sent
    send_location_button.setAttribute("disabled","disabled")

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit("location",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        },()=>{
            // re-enabling the send location button
            send_location_button.removeAttribute("disabled")
            console.log("Location shared successfully.")
        })
    })
})