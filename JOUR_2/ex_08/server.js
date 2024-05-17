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

// Route pour afficher la page de gestion
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour récupérer les documents de la collection 'students'
app.get('/api/students', async (req, res) => {
    try {
        const sortField = req.query.sort || 'id'; // Champ de tri par défaut
        const sortOrder = req.query.order === 'desc' ? -1 : 1; // Ordre de tri par défaut

        const collection = db.collection('students');
        const students = await collection.find().sort({ [sortField]: sortOrder }).toArray();
        res.json(students);
    } catch (e) {
        console.error('Error fetching students:', e);
        res.status(500).json({ message: 'Failed to fetch students.', error: e });
    }
});

// Route pour rechercher des documents
app.get('/api/students/search', async (req, res) => {
    try {
        const query = req.query.q || '';
        const regex = new RegExp(query, 'i'); // Recherche insensible à la casse
        const collection = db.collection('students');
        const students = await collection.find({
            $or: [
                { id: parseInt(query, 10) },
                { lastname: regex },
                { firstname: regex },
                { email: regex },
                { phone: regex },
                { validated: regex },
                { admin: regex === 'true' }
            ]
        }).toArray();
        res.json(students);
    } catch (e) {
        console.error('Error searching students:', e);
        res.status(500).json({ message: 'Failed to search students.', error: e });
    }
});

// Route pour rechercher des documents par firstname, lastname, et phone
app.get('/api/students/searchByCriteria', async (req, res) => {
    try {
        const firstname = req.query.firstname || '';
        const lastname = req.query.lastname || '';
        const phone = req.query.phone || '';
        const collection = db.collection('students');

        const searchCriteria = {};

        if (firstname) {
            searchCriteria.firstname = new RegExp(firstname, 'i');
        }

        if (lastname) {
            searchCriteria.lastname = new RegExp(lastname, 'i');
        }

        if (phone) {
            searchCriteria.phone = new RegExp(phone, 'i');
        }

        const students = await collection.find(searchCriteria).toArray();
        res.json(students);
    } catch (e) {
        console.error('Error searching students by criteria:', e);
        res.status(500).json({ message: 'Failed to search students.', error: e });
    }
});

// Route pour la recherche avancée par critères
app.get('/api/students/advancedFilter', async (req, res) => {
    try {
        const idCondition = req.query.idCondition || 'eq';
        const idValue = parseInt(req.query.idValue, 10) || null;
        const validated = req.query.validated || '';
        const admin = req.query.admin || '';
        const collection = db.collection('students');

        const searchCriteria = {};

        if (idValue !== null) {
            if (idCondition === 'gt') {
                searchCriteria.id = { $gt: idValue };
            } else if (idCondition === 'lt') {
                searchCriteria.id = { $lt: idValue };
            } else {
                searchCriteria.id = idValue;
            }
        }

        if (validated) {
            searchCriteria.validated = validated;
        }

        if (admin !== '') {
            searchCriteria.admin = admin === 'true';
        }

        const students = await collection.find(searchCriteria).toArray();
        res.json(students);
    } catch (e) {
        console.error('Error performing advanced filter:', e);
        res.status(500).json({ message: 'Failed to perform advanced filter.', error: e });
    }
});

// Route pour récupérer un document par ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const collection = db.collection('students');
        const student = await collection.findOne({ id: id });
        res.json(student);
    } catch (e) {
        console.error('Error fetching student by ID:', e);
        res.status(500).json({ message: 'Failed to fetch student.', error: e });
    }
});

// Route pour ajouter une nouvelle entrée
app.post('/api/students', async (req, res) => {
    const formData = req.body;

    try {
        formData.id = await getNextId(); // Obtenir le prochain ID
        formData.admin = formData.admin === 'true' || formData.admin === true;

        const collection = db.collection('students');
        const result = await collection.insertOne(formData);
        console.log('Form data inserted:', result.insertedId);
        res.json({ message: 'Entry added successfully.' });
    } catch (e) {
        console.error('Error inserting data:', e);
        res.status(500).json({ message: 'Failed to add entry.', error: e });
    }
});

// Route pour modifier une entrée existante
app.put('/api/students/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;

    try {
        if (updatedData.admin) {
            updatedData.admin = updatedData.admin === 'true' || updatedData.admin === true;
        }

        const collection = db.collection('students');
        const result = await collection.updateOne({ id: id }, { $set: updatedData });
        console.log('Form data updated:', result.matchedCount);
        res.json({ message: 'Entry updated successfully.' });
    } catch (e) {
        console.error('Error updating data:', e);
        res.status(500).json({ message: 'Failed to update entry.', error: e });
    }
});

// Route pour supprimer une entrée existante
app.delete('/api/students/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const collection = db.collection('students');
        const result = await collection.deleteOne({ id: id });
        console.log('Form data deleted:', result.deletedCount);
        res.json({ message: 'Entry deleted successfully.' });
    } catch (e) {
        console.error('Error deleting data:', e);
        res.status(500).json({ message: 'Failed to delete entry.', error: e });
    }
});

app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
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