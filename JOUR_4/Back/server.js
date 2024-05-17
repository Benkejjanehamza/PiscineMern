const express = require('express');
const { connectToDatabase } = require('./database');
const cors = require('cors');
const UserRoute = require('./routes/userRoutes');
const BlogRoute = require('./routes/BlogRoutes');
const commentRoute = require('./routes/commentRoutes');

const app = express();
const PORT = 4242;
app.use(cors());
connectToDatabase().then(() => {
    app.use(express.json());

    app.use('/api', UserRoute);
    app.use('/api', BlogRoute);
    app.use('/api', commentRoute);



    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
});
