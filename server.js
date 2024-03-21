const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const PORT = process.env.PORT || 8000;
const url = 'mongodb://localhost:27017/foodStore';

mongoose.connect(url)
    .then(() => {
        console.log(`Connected to ${url}`)
    })
    .catch(error => console.log(`Error connecting to  ${url}:${error}`));

app.use(express.json());
app.use('/', routes);


// Socket.io -----------
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});


io.on('connection', socket => {
    console.log('A user connected');

    socket.on('customer', data => {
        console.log('Message received from customer:', data);
        socket.join('room');
        io.to('room').emit('customer', data);
    });

    socket.on('store', data => {
        console.log('Message received form store:', data)
        socket.join('room');
        io.to('room').emit('store', data);

    })
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});



server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
