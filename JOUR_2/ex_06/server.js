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
        db = client.db(dbName); // Mettre à jour la variable db ici
    } catch (e) {
        console.error('Connection failed:', e);
    }
}

connectToDatabase().catch(console.error);

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const formData = req.body;

    try {
        formData.id = await getNextId();
        formData.admin = formData.admin === 'on';

        const collection = db.collection('students');
        const result = await collection.insertOne(formData);
        console.log('Form data inserted:', result.insertedId);
        res.redirect('/form?success=true');
    } catch (e) {
        console.error('Error inserting data:', e);
        res.redirect('/form?success=false');
    }
});

// Route pour afficher la page de la collection
app.get('/collectionView', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'collection.html'));
});

// Route pour récupérer les documents de la collection 'students'
app.get('/api/students', async (req, res) => {
    try {
        const collection = db.collection('students');
        const students = await collection.aggregate([
            {
                $match: { validated: 'in progress' }
            },
            {
                $addFields: {
                    lowerLastname: { $toLower: "$lastname" }
                }
            },
            {
                $sort: { lowerLastname: 1 }
            },
            {
                $project: {
                    lowerLastname: 0
                }
            }
        ]).toArray();
        res.send(students);
    } catch (e) {
        console.error('Error fetching students:', e);
        res.status(500).json({ message: 'Failed to fetch students.', error: e });
    }
});


// Fonction pour obtenir le prochain ID
async function getNextId() {
    const collection = db.collection('students');
    const lastStudent = await collection.find().sort({ id: -1 }).limit(1).toArray();
    if (lastStudent.length === 0) {
        return 1;
    } else {
        return lastStudent[0].id + 1;
    }
}
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

