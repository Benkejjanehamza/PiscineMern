const mongoose = require('mongoose');

const Comment = require('../model/CommentModel');
const Blog = require('../model/BlogModel');
const { ObjectId } = mongoose.Types;

exports.addComment = async (req, res) => {
    let { postId, content } = req.body;
    const authorId = req.user._id;

    postId = new ObjectId(postId);

    console.log(`Received request to add comment to post ID: ${postId}`);
    console.log(`Comment content: ${content}`);
    console.log(`Author ID: ${authorId}`);

    try {
        const comment = new Comment({ content, postId, authorId });
        await comment.save();
        console.log(`Comment saved with ID: ${comment._id}`);

        await Blog.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
        console.log(`Comment added to blog post with ID: ${postId}`);

        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (e) {
        console.error('Error adding comment:', e);
        res.status(500).json({ message: 'Failed to add comment', error: e });
    }
};

exports.getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    if (!ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'Invalid post ID' });
    }
    const postObjectId = new ObjectId(postId);


    try {
        const comments = await Comment.find({ postId: postObjectId }).populate('authorId', 'login email');
        res.status(200).json(comments);
    } catch (e) {
        console.error('Error fetching comments:', e);
        res.status(500).json({ message: 'Failed to fetch comments', error: e });
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;


    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const blog = await Blog.findById(comment.postId);
        if (blog.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId);
        await Blog.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (e) {
        console.error('Error deleting comment:', e);
        res.status(500).json({ message: 'Failed to delete comment', error: e });
    }
};