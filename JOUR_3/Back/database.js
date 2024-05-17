const { MongoClient } = require('mongodb');
const config = require('./config');

let db;

async function connectToDatabase() {
    const client = new MongoClient(config.db.url, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connection successful');
        db = client.db(config.db.name);
    } catch (e) {
        console.error('Connection failed:', e);
        throw e;
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}

module.exports = {
    connectToDatabase,
    getDb
};
