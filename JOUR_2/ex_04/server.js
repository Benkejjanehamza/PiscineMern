const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27042';
const dbName = 'mern-pool';

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connection successful');


    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
