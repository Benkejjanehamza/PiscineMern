const express = require('express');


const authMiddleware = require('../middleware/auth');
const router = express.Router();
//CONTROLLER

const userController = require('../controller/UserController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/getLogin', userController.getLogin);


module.exports = router;
