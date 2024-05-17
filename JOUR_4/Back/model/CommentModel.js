const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 500
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;
