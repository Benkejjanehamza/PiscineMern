const { ObjectId } = require('mongodb');
const { getDb } = require('../database');

const authMiddleware = async (req, res, next) => {
    // Assurez-vous d'envoyer cet en-tête depuis le frontend
    const userId = req.headers['x-user-id'];

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: No user ID provided' });
    }

    try {
        const collection = getDb().collection('users');
        const user = await collection.findOne({ _id: ObjectId(userId) });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid user ID' });
        }

        req.user = user;
        next();
    } catch (e) {
        console.error('Error in auth middleware:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
