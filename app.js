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
        // console.log(user.room)
        // user.room.map(room=>{
        //     socket.join(room)
        // })
        
        // private message
        // socket.join('user:'+user.id)
      
        // group
        socket.join(user.room)
        socket.emit('message', 'both : Selamat menggunakan aplikasi chat '+ user.username)
        socket.broadcast.to(user.room).emit('notif', 'both: user join... ' + user.username)
    })

    socket.on('sendMessage', (data, callback) =>{
        const error = true;
        if(error){
            callback('server down')
        }
        const time = new Date()
        io.to(data.room).emit('message', data.message)
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnect')
    });
});

app.use('/user', routerUser)

const PORT = process.env.PORT || 4000

server.listen(PORT, ()=> console.log('SERVER IN RUNNING 🚀 PORT ' + PORT))