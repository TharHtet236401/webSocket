//These are modules required
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

//These are the instances
const app = express();
const server = createServer(app);
const io = new Server(server);

//send the index file with file location
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// open connection with the client side
io.on('connection', (socket) => {
  console.log("user connected");

  // Listening for 'chat message' events from clients
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // Broadcasting the received message to all connected clients
    io.emit('chat message', msg);
  });

  
 

});





//server starts
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
