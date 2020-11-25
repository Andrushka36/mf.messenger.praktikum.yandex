const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8888;

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});
