
$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")    
    var send_username = $("#join")    

    //Enviar un nuevo mensaje
    send_message.click(function(){
        socket.emit('change_username', {username : username.val()})
        socket.emit('new_message', {message : message.val()})
    })

    //Publicar el nuevo mensaje
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })
    
    //Emit a username
    send_username.click(function(){
        socket.emit('change_username', {username : username.val()})
        socket.emit('loging')
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i><span style=\"color: red;\">" + data.username + " está escribiendo..." + "</span></i></p>")
    })

    //Listen on typing
    socket.on('loging', (data) => {
        chatroom.append("<p><i><span style=\"color: green;\">" + data.username + " se ha unido al chat." + "</span></i></p>")
    })
});


