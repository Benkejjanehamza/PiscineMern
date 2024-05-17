const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/UsersModel');
const config = require('../config');

const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        console.log("Received Token:", token);
        const decoded = jwt.verify(token, config.secretKey);
        console.log("Decoded Token:", decoded);
        const userId = new mongoose.Types.ObjectId(decoded.id);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
};

module.exports = authMiddleware;