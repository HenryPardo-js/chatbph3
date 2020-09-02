const path = require('path')
const express = require('express')
const app = express()
const socketIO = require('socket.io')

app.set('port',process.env.PORT || 3000)

//Permitir que express tenga acceso a archivos del cliente
app.use(express.static(path.join(__dirname, '..','client')))

const server=app.listen(app.get('port'),()=>{
    console.log('Servidor http://localhost:3000/')
})

const io=socketIO.listen(server)


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

