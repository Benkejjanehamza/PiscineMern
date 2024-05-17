
const userModel = require('../model/UsersModel');
const jwt = require('jsonwebtoken');
const config = require('../config');


const crypto = require('crypto');
const {getDb} = require("../database");


exports.register = async (req, res) => {
    const { login, email, password } = req.body;

    const shasum = crypto.createHash('sha1');
    shasum.update(password);
    const passwordHash = shasum.digest('hex');

    try {
        const newUser = new userModel({
            login: login,
            email: email,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ email, id: savedUser._id.toString() }, config.secretKey, { expiresIn: '1h' });
        savedUser.token = token;
        await savedUser.save();

        res.status(200).json({ message: 'Inscription successful', token: token, admin: savedUser.admin, login : savedUser.login, userId : savedUser._id  });
    } catch (e) {
        console.error('Error registering user:', e);
        res.status(500).json({ message: 'Failed to register user', error: e });
    }
};


exports.login = async (req, res) => {

    const { email, password } = req.body;

    const shasum = crypto.createHash('sha1');
    shasum.update(password);
    const passwordHash = shasum.digest('hex');

    try {
        const user = await userModel.findOne({ email, password: passwordHash });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ email, id: user._id.toString() }, config.secretKey, { expiresIn: '1h' });

        user.token = token;

        await user.save();

        res.status(200).json({ message: 'Login successful', token: token, admin: user.admin, login : user.login, userId: user._id });
    } catch (e) {
        console.error('Error logging in:', e);
        res.status(500).json({ message: 'Failed to log in', error: e });
    }
};

exports.getLogin = async (req, res) => {

    const { token } = req.body;
     try {
         const user = await userModel.findOne( { token: token });
         res.status(200).json({ message: 'User found', user });

     }catch (e) {
         res.status(500).json({ message: 'Failed to fetch user', error: e });
     }
}


async function getNextId(collection) {
    const lastUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
    if (lastUser.length === 0) {
        return 1;
    } else {
        return lastUser[0].id + 1;
    }
}

