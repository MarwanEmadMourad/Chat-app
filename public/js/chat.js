const socket = io()

// Elements
const text_form = document.querySelector("#text_form") ;
const input_text = document.querySelector("#message_text_area");
const send_button = document.querySelector("#send_button")
const send_location_button = document.querySelector("#location_button")
const messages = document.querySelector("#messages")

// Templates
const message_template = document.querySelector("#message_template").innerHTML
const location_template = document.querySelector("#location_template").innerHTML

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

// normal messages rendering
socket.on("message2client" , (message) =>{
    // console.log(message)
    const html = Mustache.render(message_template,{
        message:message.text,
        createdAt:moment(message.createdAt).format("h:mm a")
    })
    messages.insertAdjacentHTML("beforeend",html)
})

// location messages rendering
socket.on("location2client" , (link_obj) =>{
    // console.log(url)
    const html = Mustache.render(location_template,{
        url:link_obj.url,
        createdAt:moment(link_obj.createdAt).format("h:mm a")
    })

    messages.insertAdjacentHTML("beforeend",html)
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