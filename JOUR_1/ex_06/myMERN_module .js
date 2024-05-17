

const fs = require('fs');
const path = require('path');

const myMERN_module = {
    create: function(name) {
        fs.createWriteStream(`./public/${name}`);
        const content = `Create ${name} : OK`;

        fs.writeFile(`./public/${name}`, content, err => {
            if(err){
                console.log(`Create ${name} : KO`);
            }else{
                console.log(`Create ${name} : OK`);
            }
        })
    },

    read: function(name) {

        fs.readFile(`./public/${name}`, 'utf8', (err, data) => {
            if (err) {
                console.error(`Read ${name} : KO`);
                return;
            }
            console.log(data);
        });
    },

    update: function(name, content) {

        fs.truncate(`./public/${name}`, 0, function(err){
            if(err){
                console.log(`Update ${name} : KO`)
            }else{
                console.log(`Update ${name} : OK`)
            }
        })
        fs.appendFile(`./public/${name}`, `${content}`, function (err) {
            if(err){
                `Update ${name} : KO`
            }
        });
    },

    delete: function(name) {

        fs.unlink(`./public/${name}`, function (err) {

            if (err){
                console.log(`Delete ${name} : KO`)
            }else{
                console.log(`Delete ${name} : OK`)
            }
        });
    }
};

module.exports = myMERN_module;

