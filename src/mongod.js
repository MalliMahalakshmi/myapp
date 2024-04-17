const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

// Connect to MongoDB
mongoose.connect(mongoURI, {

})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose.connection;
