const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4242;

const url = 'mongodb://localhost:27042';
const dbName = 'mern-pool';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let db;

// Connexion à MongoDB et stockage de l'objet db
async function connectToDatabase() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connection successful');
        db = client.db(dbName);
    } catch (e) {
        console.error('Connection failed:', e);
    }
}

connectToDatabase().catch(console.error);

async function getNextId() {
    const collection = db.collection('students');
    const lastStudent = await collection.find().sort({ id: -1 }).limit(1).toArray();
    if (lastStudent.length === 0) {
        return 1;
    } else {
        return lastStudent[0].id + 1;
    }
}
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const formData = req.body;

    formData.id = await getNextId();
    formData.admin = formData.admin === 'on';

    try {
        const collection = db.collection('students');
        const result = await collection.insertOne(formData);
        console.log('Form data inserted:', result.insertedId);
        res.redirect('/form?success=true');
    } catch (e) {
        console.error('Error inserting data:', e);
        res.redirect('/form?success=false');
    }
});

app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
