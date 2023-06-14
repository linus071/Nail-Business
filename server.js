const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//Generating ID
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

//Where it first access
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/Intro.html');
});


//Setting up MySQL connection
const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    user: '5g4wore1emwxe91fmx9b',
    password: 'pscale_pw_I3bpnuXOep10RHRNRXZEG9FnLmKVE2qbD0HKQe41ohG',
    database: 'ubc_nails_info',
    ssl: {
    // Specify SSL options here
    // For example, if you have the SSL certificate and key files, you can provide their paths
    ca: require('fs').readFileSync('ca.pem'),
    cert: require('fs').readFileSync('server-cert.pem'),
    key: require('fs').readFileSync('server-key.pem')
  }
})

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

function generateUniqueId(){

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



//Showing which port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});