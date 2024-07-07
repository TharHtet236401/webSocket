const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User connected');

  // Broadcast to all clients that a new user has connected
  io.emit('chat message', 'User connected');

  // Listening for 'chat message' events from clients
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the received message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Broadcast to all clients that a user has disconnected
    io.emit('chat message', 'User disconnected');
  });

});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
