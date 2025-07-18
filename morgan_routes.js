const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

//  Setup morgan logger to write logs into access.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

//  Middleware for logging all requests
app.use(morgan('combined', { stream: accessLogStream }));

//  Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

//  Route: Home page → home.html
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route: About page → about.html
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

//  Start server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
  });