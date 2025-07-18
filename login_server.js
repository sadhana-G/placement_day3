const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// 1️ Morgan logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

// 2️ Form POST body parser
app.use(express.urlencoded({ extended: true }));

// 3️ Static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// 4️ Routes for GET
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/review', (req, res) => res.sendFile(path.join(__dirname, 'public', 'review.html')));
app.get('/feedback', (req, res) => res.sendFile(path.join(__dirname, 'public', 'feedback.html')));

// 5️ Contact POST — responds with HTML file
app.post('/contact', (req, res) => {
  const { username, message } = req.body;
  console.log(`${username} says: ${message}`);
  //res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
   
  res.send(`
    <h2> Thank you , ${username}! for being a good developer</h2>
    <p>Your message: "${message}" has been received.</p>
    <a href="/">Go back to Home</a>
  `);

});

app.post('/review', (req, res) => {
    const { product, review } = req.body;
    console.log(`${product} says: ${review}`);
    //res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
     
    res.send(`
      <h2> Thank you , ${product}! for being a good developer</h2>
      <p>Your message: "${review}" has been received.</p>
      <a href="/">Go back to Home</a>
    `);
  
  });

  app.post('/feedback', (req, res) => {
    const { feedbacks} = req.body;
    console.log(`${feedbacks} `);
    //res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
     
    res.send(`
      <h2> Thank you ..</h2>
      <p>Your message: "${feedbacks}" has been received.</p>
      <a href="/">Go back to Home</a>
    `);
  
  });

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Login Attempt: ${username}`);
 
  if (username === "admin" && password === "1234") {
    res.send(`<h2>Welcome, ${username}! you have successfuly logged </h2><a href="/">Go Home</a>`);
  } else {
    res.send(`<h2> Invalid credentials</h2><a href="/login">Try Again</a>`);
  }
});

// 6️ Fallback 404 page
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 Not Found</h1>
    <a href="/">Return Home</a>
  `);
});

// 7️ Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

