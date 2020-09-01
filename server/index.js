const express = require('express')
const app = express()
//La aplicacion escuchara en el puerto 3000
server = app.listen(3000)
const io = require("socket.io")(server)

app.use(express.static("client"));


//para permitir la conexion de cualquier usuario
io.on('connection', (socket) => {
    console.log('New User connected')

    //default username
	socket.username = "Nuevo usuario"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on loging
    socket.on('loging', (data) => {
        //broadcast the new message
        socket.broadcast.emit('loging', {username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

