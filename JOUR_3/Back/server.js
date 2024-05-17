const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const { connectToDatabase } = require('./database');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);
app.use('/', routes);



connectToDatabase()
    .then(() => {
        app.listen(config.server.port, () => {
            console.log(`Server is running on http://localhost:${config.server.port}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to the database:', error);
    });
