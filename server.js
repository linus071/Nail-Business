const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Generating ID
let idCounter = 0;

// Retrieve the last assigned ID from the database and set idCounter accordingly
function fetchLastAssignedId() {
  const query = "SELECT MAX(id) AS lastId FROM user_info";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching last assigned ID:', error);
    } else {
      idCounter = results[0].lastId || 0;
      console.log('Last assigned ID:', idCounter);
    }
  });
}

// Where it first accesses
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/Intro.html');
});

// Setting up MySQL connection
const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: '8wmpkihkelo149416jls',
  password: process.env.DB_PASSWORD,
  database: 'ubc_nails_info',
  ssl: {
    rejectUnauthorized: true,
  },
});

// Connecting to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    //    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
    fetchLastAssignedId();
  }
});

function generateUniqueId() {
  idCounter++;
  return idCounter;
}

// Pass the MySQL connection to request handlers
app.use((req, res, next) => {
  req.db = connection;
  next();
});

app.post('/signup', (req, res) => {
  const id = generateUniqueId(); // Assuming you have a function to generate unique IDs
  const username = req.body.username;
  const email = req.body.email;
  const wechat = req.body.wechat;
  const password = req.body.password;

  // Insert the signup data into the database
  const query = `INSERT INTO user_info (id, username, email, wechat, password) VALUES (?, ?, ?, ?, ?)`;
  connection.query(query, [id, username, email, wechat, password], (error, results) => {
    if (error) {
      console.error('Error storing signup data:', error);
      res.status(500).send('Error storing signup data');
    } else {
      console.log('Signup data stored successfully');
      res.send('Signup successful!');
    }
  });
});

// Showing which port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});