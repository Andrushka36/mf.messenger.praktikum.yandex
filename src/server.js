const express = require('express');
const path = require('path');

const app = express();
const PORT = 8888;

app.use(express.static(path.resolve(__dirname, '../static')));

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});