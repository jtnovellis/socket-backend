require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: 'https://sokeck-frontend.vercel.app',
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'https://sokeck-frontend.vercel.app',
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
