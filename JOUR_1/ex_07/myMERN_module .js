

const fs = require('fs');
const path = require('path');
const {response} = require("express");

const myMERN_module = {
    create: function(name, res) {

        fs.createWriteStream(`./public/${name}`);
        const content = `Create ${name} : OK`;

        fs.writeFile(`./public/${name}`, content, err => {
            if(err){
                console.log(`Create ${name} : KO`);
            }else{
                res.json({ message: `Create ${name} : OK`});
            }
        })
    },

    read: function(name, res) {

        fs.readFile(`./public/${name}`, 'utf8', (err, data) => {
            if (err) {
                console.error(`Read ${name} : KO`, err);
                res.status(404).json({ message: `Read ${name} : KO`, error: err.message });
            } else {
                res.json({ message: `Read ${name} : OK`, content: data });
            }
        });
    },

    update: function(name, content, res) {

        fs.truncate(`./public/${name}`, 0, function(err){
            if(err){
                res.status(404).json({ message: `Read ${name} : KO`, error: err.message });
            }else{
                res.json({ update: `Read ${name} : OK`, content: content });
            }
        })
        fs.appendFile(`./public/${name}`, `${content}`, function (err) {
            if(err){
                `Update ${name} : KO`
            }
        });
    },

    delete: function(name, res) {

        fs.unlink(`./public/${name}`, function (err) {

            if (err){
                res.status(500).json({ message: `Delete ${name} KO`})
            }else{
                res.status(202).json({ message: `Delete ${name} OK`})
            }
        });
    }
};

module.exports = myMERN_module;

