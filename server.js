const express = require('express');
const path = require('path');

const app = express();
const PORT = 8888;

app.use(express.static(path.resolve(__dirname, './static')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.listen(PORT, function () {
    console.log(`App is running at http://localhost:${PORT}!`);
});