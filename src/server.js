
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

io.on('connection', (socket) => {
    console.log('New client connected');
  
   
    socket.emit('message', 'Welcome to the chat!');
  
    socket.on('message', (message) => {
      console.log('Received message:', message); // Log received message
      io.emit('message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
  server.listen(3000, () => console.log('Server listening on port 3000'));

  rl.on('line', (input) => {
    io.emit('message', input);
  });
