const myMERN_module = require('./myMERN_module ');

const fileName = 'name';

//CREATE
myMERN_module.create(fileName);

//READ
myMERN_module.read(fileName);

//UPDATE
myMERN_module.update(fileName, 'Bonjour antoine');

//DELETE

myMERN_module.delete(fileName)