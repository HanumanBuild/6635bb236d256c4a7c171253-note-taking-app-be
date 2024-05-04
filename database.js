const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME;

mongoose.connect(`${uri}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbName
});

mongoose.connection.on('connected', () => {
 console.log('MongoDB connected successfully.');
});

mongoose.connection.on('error', (err) => {
 console.error('MongoDB connection error:', err);
});