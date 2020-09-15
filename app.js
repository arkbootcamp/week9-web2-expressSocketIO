const express = require('express')
const http = require('http');
const { env } = require('process');
const socket = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socket(server)
const routerUser =  require('./src/router/user')

io.on('connection', socket => {
console.log('client connect')

    socket.on('welcomeMessage', user =>{
        console.log(user)
        socket.emit('message', 'both : Selamat menggunakan aplikasi chat '+ user.username)
        socket.broadcast.emit('notif', 'both: user join... ' + user.username)
    })
    socket.on('sendMessage', message =>{
        io.emit('message', message)
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnect')
    });
});

app.use('/user', routerUser)

const PORT = process.env.PORT || 4000

server.listen(PORT, ()=> console.log('SERVER IN RUNNING 🚀 PORT ' + PORT))