// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// var cors = require('cors')



// const app = express();
// app.use(cors())
// const server = http.createServer(app);
// const io = socketio(server);
// const PORT=5000


// const router=require("./router")
// app.use(router)
const express=require("express")
const app=express()
const PORT=8000
// var server  = app.listen(PORT);

const http = require("http").Server(app)
var io = require("socket.io" )(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});
var cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom,users } = require('./users');
const { log } = require("console");
app.use(cors())






app.get("/",(req,res)=>{
    res.sendFile( __dirname + "/index.html");
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});








io.on( "connection", function( socket ) {
  console.log("a user has connected!", "id",socket.id );
  socket.on( "disconnect", function() {
  console.log( "user disconnected" );
  });




      socket.on("join",({name,room},callback=()=>{})=>{

        const {error,user}=addUser({id:socket.id,name,room})
        if(user){
            console.log("user entered",user);
            console.log("All users",users);
        }
        if (error) return callback(error)

    socket.join(user.room)

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback()
      })


    //   on sendMessage

    socket.on('sendMessage', (message, callback=()=>{}) => {
        console.log("SOCKET ID",socket.id);

        // To get the user from our by the socket id
        const user = getUser(socket.id);
        console.log("User  when send message",user);
        if(!user){
            
        }
        if(user){
            console.log("SEND MESSAGE");
            console.log(" user entered",user);
            console.log("All users",users);


            // To send message to the room user.room
            io.to(user.room).emit('message', { user: user.name, text: message });
    
        callback();
        }
        else{

            console.log("User NOT found");
        }
        
      });


      socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      })




  });
