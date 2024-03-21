const io = require('socket.io-client');



const socket = io.connect('http://localhost:8000'); 

socket.on('customer', data => {
    console.log('Message from customer : ', data);
});
socket.emit('customer');


socket

socket.on('store', data => {
    console.log(' Message from Store :', data);
});
socket.emit('store');