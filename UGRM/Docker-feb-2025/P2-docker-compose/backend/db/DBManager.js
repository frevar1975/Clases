/*
* Copyright (c) 2024 Manuel Otero Barbasán
*/
// db.js

const { MongoClient } = require('mongodb');

// Function to connect to MongoDB
async function connectDB() {
  const client = new MongoClient('mongodb://mongo:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('fruits');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function populateDB(fruitsDB) {
  const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'pear', color: 'green' },
  ];

  try {
    await fruitsDB.collection('fruits').insertMany(fruits);
    console.log('Fruits inserted');
  } catch (error) {
    console.error('Error inserting fruits:', error);
    throw error;
  }
}

module.exports = { connectDB, populateDB};
