const express = require('express');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const app = express();
const PORT = 4242;

app.use(express.static('public'));


app.get(`/name/:names?`, (req, res) => {
    let names = req.params.names || 'unknown';

    const filePath = path.join(__dirname, 'public', 'test.html');
    let htmlContent = fs.readFileSync(filePath, 'utf8');
    htmlContent = htmlContent.replace('<h1 id="hello"></h1>', `<h1 id="hello">Hello ${names}</h1>`);
    res.send(htmlContent);
});

app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
