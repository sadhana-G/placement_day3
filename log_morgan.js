const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = 3000;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send(' welcome to the world of OUT OF WORLD');
})
app.get('/contact', (req, res) => {
    res.send(' your contacting person is currenrtly out of world..');
  })
  app.get('/about', (req, res) => {
    res.send('we are the VIPs of the future of world ');
  }
);

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
