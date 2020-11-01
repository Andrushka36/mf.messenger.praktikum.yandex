const express = require('express');
const path = require('path');

const app = express();
const PORT = 8888;

app.use(express.static(path.resolve(__dirname, './static')));
app.use('/404', express.static(path.resolve(__dirname, './static')));
app.use('/500', express.static(path.resolve(__dirname, './static')));
app.use('/chat', express.static(path.resolve(__dirname, './static')));
app.use('/edit-profile', express.static(path.resolve(__dirname, './static')));
app.use('/login', express.static(path.resolve(__dirname, './static')));
app.use('/profile', express.static(path.resolve(__dirname, './static')));
app.use('/registration', express.static(path.resolve(__dirname, './static')));

app.listen(PORT, function () {
    console.log(`App is running at http://localhost:${PORT}!`);
});