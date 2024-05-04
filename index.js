const express = require('express');
const cors = require('cors');
const app = express();

require('./database');  // Connect to the database

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

const port = 3000;
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});