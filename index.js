require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New connection');
  socket.on('Channel', ({ user, message }) => {
    if (!message) {
      io.emit('broadcast', user);
    } else {
      io.emit('broadcast', { user, message });
    }
  });
});

server.listen(PORT, () => {
  console.log(`The server is running 🏃🏾 on port: ${PORT}`);
});
