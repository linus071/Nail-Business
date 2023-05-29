const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Intro.html');
});

app.get('/Book.html', (req, res) => {
  res.sendFile(__dirname + '/Book.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform login logic here
  // Validate credentials, check in a database, etc.

  // Example response for successful login
  if (username === 'admin' && password === 'password') {
    res.redirect('/Book.html');
  } else {
    res.send('Invalid username or password!');
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Perform signup logic here
  // Create a new user, storei n a database, etc.

  // Example response for successful signup
   res.redirect('/Book.html');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});