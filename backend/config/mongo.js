const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB || process.env.mongo || Object.values(process.env).find(v => v.includes('mongodb+srv://'));

function connectMongo() {
  if (!MONGO_URI) {
    throw new Error('MongoDB connection string not found in environment variables.');
  }
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

module.exports = connectMongo;
