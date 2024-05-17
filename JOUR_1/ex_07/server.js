const express = require('express');
const fs = require('fs');
const path = require('path');


require('dotenv').config();
const app = express();

app.use(express.json);

const PORT = 4242;

app.use(express.static('public'));

const myMERN_module = require('./myMERN_module ');


app.get(`/files/:name`, (req, res) => {
    let names = req.params.name;
    myMERN_module.read(names, res);
});

app.post(`/files/:name`, (req, res) => {
    let names = req.params.name;
    myMERN_module.create(names, res);
});

app.put(`/files/:name/:content`, (req, res) => {

    let names = req.params.name;
    let content = req.params.content;
    myMERN_module.update(names, content, res);

});

app.delete(`/files/:name`, (req, res) => {

    let names = req.params.name;
    myMERN_module.delete(names, res);

});


app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
