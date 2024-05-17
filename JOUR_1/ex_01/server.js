
require('dotenv').config();
const express = require('express');
const app = express();

const PORT = 4242;

app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
