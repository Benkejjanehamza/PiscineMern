const express = require('express');


const authMiddleware = require('../middleware/auth');
const router = express.Router();
//CONTROLLER

const blogController = require('../controller/BlogController');

router.post('/postBillet', authMiddleware, blogController.postBillet);

router.get('/getAllBillet/:login', authMiddleware, blogController.getAllBillet);



router.post('/updateBillet', authMiddleware, blogController.updateBillet);


router.post('/deleteBillet', authMiddleware, blogController.deleteBillet);

router.post('/AllUserBillet', authMiddleware, blogController.allUserBillet);

router.get('/getIdBillet/:id', authMiddleware, blogController.getIdBillet);

module.exports = router;
