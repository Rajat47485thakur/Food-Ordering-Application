
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');


const app = express();
const PORT = process.env.PORT || 8000;
// const CHAT_PORT = 9000;
const url = 'mongodb://localhost:27017/foodStore';
mongoose.connect(url)
    .then(() => {
        console.log(`Connected to ${url}`)
    })
    .catch(error => console.log(`Error connecting to  ${url}:${error}`));

app.use(express.json());
app.use('/', routes);

// const chatServer = new ChatServer();
// chatServer.start(CHAT_PORT);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});

