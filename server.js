
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');


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


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});










// import express from  'express';

// import connectDB from './DB/index.db.js';
// const PORT = process.env.PORT || 8000;

// const app = express();
// connectDB()
//     .then(() => {
//         app.listen(process.env.PORT ||8000, () => {
//             console.log(`⚙️  Server is running at port : ${PORT}`);
//         })
//     })
//     .catch((err) => {
//         console.log(`MONGO db connection failed !!!${err}`)
//     })
