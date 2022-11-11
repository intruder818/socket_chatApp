const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router=require("./router")

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketio(server);
const PORT=5000

app.use(router)










io.on('connection', (socket) => {
    console.log('a user connected');
  });



server.listen(process.env.PORT || 5000, () => console.log(`Server has started on ${PORT}`));