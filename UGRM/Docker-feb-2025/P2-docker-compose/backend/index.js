/*
* Copyright (c) 2024 Manuel Otero Barbasán
*/
// index.js

const express = require('express');
const { connectDB, populateDB } = require('./db/DBManager.js'); // Adjust the path based on the actual location

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
let db;

connectDB()
  .then(database => {
    db = database;
    // Start the server only after connecting to MongoDB
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
      console.log("==================================================");
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Get fruits from MongoDB
app.get('/fruits', async (req, res) => {
  try {
    const fruits = await db.collection('fruits').find({}).toArray();
    res.json(fruits);
  } catch (error) {
    console.error('Error retrieving fruits from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/fruits', express.json(), async (req, res) => {
  try {
    const newFruit = req.body;
    await db.collection('fruits').insertOne(newFruit);
    res.status(201).send('Fruit created');
  } catch (error) {
    console.error('Error creating fruit:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/fruits/populate', async (req, res) => {
  populateDB(db);
  res.status(201).send('Fruits populated!!');
});
