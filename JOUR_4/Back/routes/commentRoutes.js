const express = require('express');


const authMiddleware = require('../middleware/auth');
const router = express.Router();
//CONTROLLER

const commentController = require('../controller/CommentController');


router.post('/addComment', authMiddleware, commentController.addComment);
router.get('/getIdBillet/:postId', authMiddleware, commentController.getCommentsByPostId);

router.delete('/deleteComment/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
