const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

//  Logging to access.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

//  Body parser to handle form POST data
app.use(express.urlencoded({ extended: true }));

//  Serve static files (HTML/CSS/JS/images)
app.use(express.static(path.join(__dirname, 'public')));

// GET routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
  });
  app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
  });
  app.get('/review', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'review.html'));
  });

//  POST route to handle contact form
app.post('/contact', (req, res) => {
  const { username, message } = req.body;
  console.log(`New contact: ${username} says "${message}"`);

  res.send(`
    <h2> Thank you, ${username}!</h2>
    <p>Your message: "${message}" has been received.</p>
    <a href="/">Go back to Home</a>
  `);
});

app.post('/review', (req, res) => {
    const { product, review } = req.body;
    console.log(`New contact: ${product} says "${review}"`);
  
    res.send(`
      <h2> Thank you, ${username}!</h2>
      <p>Your message: "${message}" has been received.</p>
      <a href="/">Go back to Home</a>
    `);
  });

  app.post('/feedback', (req, res) => {
    const { feedback } = req.body;
    console.log(`${feedback}`);
  
    res.send(`
      <h2> Thank you!</h2>
      <p>Your message: "${feedback}" has been received.</p>
      <a href="/">Go back to Home</a>
    `);
  });

// 404 Handler (for any unmatched route)
app.use((req, res) => {
  res.status(404).send(`
    <h1> 404 Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go Home</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});