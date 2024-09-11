// // server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const PORT = process.env.PORT || 5000;

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Listen for chat message
//     socket.on('chat message', (msg) => {
//         // Broadcast the message to all clients
//         io.emit('chat message', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
