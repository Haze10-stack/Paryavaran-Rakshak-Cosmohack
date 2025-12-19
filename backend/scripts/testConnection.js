// scripts/testConnection.js
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connection successful!');
    console.log('Database:', mongoose.connection.name);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();