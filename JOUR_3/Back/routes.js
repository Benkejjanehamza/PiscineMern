const express = require('express');
const { getDb } = require('./database');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./middleware/auth');
const router = express.Router();

const secretKey = 'matthiasestbeau';

// Route pour enregistrer un nouvel utilisateur
router.post('/api/register', async (req, res) => {
    const { login, email, password } = req.body;

    try {
        // Hachage du mot de passe avec SHA-1
        const shasum = crypto.createHash('sha1');
        shasum.update(password);
        const passwordHash = shasum.digest('hex');

        const collection = getDb().collection('users');
        const id = await getNextId(collection);
        const admin = false;

        const token = jwt.sign({ email, id }, secretKey, { expiresIn: '1h' });

        const result = await collection.insertOne({ id, login, email, password: passwordHash, admin, token });

        res.status(200).json({ message: 'User registered successfully', token: token, admin: admin });
    } catch (e) {
        console.error('Error registering user:', e);
        res.status(500).json({ message: 'Failed to register user', error: e });
    }
});

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hachage du mot de passe avec SHA-1
        const shasum = crypto.createHash('sha1');
        shasum.update(password);
        const passwordHash = shasum.digest('hex');

        const collection = getDb().collection('users');
        const user = await collection.findOne({ email, password: passwordHash });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Génération d'un nouveau token JWT
        const token = jwt.sign({ email, id: user.id }, secretKey, { expiresIn: '1h' });

        // Mise à jour du token dans la base de données
        await collection.updateOne({ _id: user._id }, { $set: { token } });

        res.status(200).json({ message: 'Login successful', token: token, admin: user.admin });
    } catch (e) {
        console.error('Error logging in:', e);
        res.status(500).json({ message: 'Failed to log in', error: e });
    }
});
router.post('/api/getLogin', async (req, res) => {

    const { token } = req.body;

    try {
        const collection = getDb().collection('users');
        const user = await collection.findOne({ token: token});
        if (!user) {
            return res.status(404).json({ message: 'User not' });
        }

        res.status(200).json({ message: 'User found', user });
    } catch (e) {
        console.error('Error fetching user:', e);
        res.status(500).json({ message: 'Failed to fetch user', error: e });
    }
});

//middleware
router.get('/api/admin', authMiddleware, (req, res) => {
    if (!req.user.admin) {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    res.status(200).json({ message: 'Welcome Admin', user: req.user });
});

router.get('/api/accueil', (req, res) => {

});


//SHOP
router.post('/api/submitAnnonce', async (req, res) => {

        const { title, description, price } = req.body;
        const collection = getDb().collection('articles');
        const id = await getNextId(collection);

    try {
        const result = await collection.insertOne({ id, title, description, price});
        res.status(200).json({ message: 'Annonce posté' });

    }catch (e) {
        res.status(500).json({ message: 'Failed to fetch user', error: e });
    }
});

router.get('/api/getAnnonce', async (req, res) => {
    const collection = getDb().collection('articles');
    try {
        const annonces = await collection.find().toArray();
        res.status(200).json(annonces);
    } catch (e) {
        console.error('Error fetching annonces:', e);
        res.status(500).json({ message: 'Failed to fetch annonces', error: e });
    }
});

router.post('/api/getAnnonceUnique', async (req, res) => {
    const { id } = req.body;

    const collection = getDb().collection('articles');

    try {
        const annonce = await collection.findOne({ id: id });
        if (!annonce) {
            return res.status(404).json({ message: 'Annonce not found' });
        }
        res.status(200).json(annonce);
    } catch (e) {
        console.error('Error fetching annonce:', e);
        res.status(500).json({ message: 'Failed to fetch annonce', error: e });
    }
});

// Fonction pour obtenir le prochain ID
async function getNextId(collection) {
    const lastUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
    if (lastUser.length === 0) {
        return 1;
    } else {
        return lastUser[0].id + 1;
    }
}

module.exports = router;
