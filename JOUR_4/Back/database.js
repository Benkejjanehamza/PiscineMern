const mongoose = require('mongoose');
const config = require('./config');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.db.url, {
            dbName: config.db.name
        });
        console.log('Connection successful');
    } catch (e) {
        console.error('Connection failed:', e);
        throw e;
    }
};

module.exports = {
    connectToDatabase
};