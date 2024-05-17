const express = require('express');
const path = require('path');

require('dotenv').config();
const app = express();
const PORT = 4242;

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
