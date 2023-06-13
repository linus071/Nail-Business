const express = require('express');
const app = express();
const port = 3000;
const CyclicDb = require('@cyclic.sh/dynamodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//Generating ID
let idCounter = 0;

//Where it first access
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/Intro.html');
});

// Initializing CyclicDB
const db = CyclicDb('weary-undershirt-bearCyclicDB');

// Fetch the last assigned ID from CyclicDB and set idCounter accordingly
async function fetchLastAssignedId() {
  try {
    const result = await db.query('user_info').orderBy('id', 'desc').limit(1).fetch();
    if (result.length > 0) {
      idCounter = result[0].id;
      console.log('Last assigned ID:', idCounter);
    }
  } catch (error) {
    console.error('Error fetching last assigned ID:', error);
  }
}

// Generating unique ID
function generateUniqueId() {
  idCounter++;
  return idCounter.toString();
}

// Pass the CyclicDB instance to request handlers
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.post('/signup', async (req, res) => {
  const id = generateUniqueId();
  const username = req.body.username;
  const email = req.body.email;
  const wechat = req.body.wechat;
  const password = req.body.password;

  try {
    // Insert the signup data into CyclicDB
    const result = await db.set(id, { username, email, wechat, password }, 'user_info');

    console.log('Signup data stored successfully');
    res.send('Signup successful!');
  } catch (error) {
    console.error('Error storing signup data:', error);
    res.status(500).send('Error storing signup data');
  }
});

//Showing which port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});