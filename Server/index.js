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
app.use(cors())






app.get("/",(req,res)=>{
    res.sendFile( __dirname + "/index.html");
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});








io.on( "connection", function( socket ) {
  console.log("a user has connected!" );
  socket.on( "disconnect", function() {
  console.log( "user disconnected" );
  });

  socket.on( "upvote-event", function( upvote_flag ) {
      console.log( "upvote:" + upvote_flag );
      });

  });
