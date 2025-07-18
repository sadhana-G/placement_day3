const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const time = new Date().toLocaleString();       // Human-readable time
  const ip = req.ip || req.connection.remoteAddress; // IP address
  const method = req.method;                      // GET, POST, etc.
  const url = req.originalUrl;                    // Full requested URL

  console.log(` ${time} |  IP: ${ip} |  ${method} ${url}`);
  next(); // Continue to next middleware or route
});

app.get('/', (req, res) => {
  res.send('You reached the homepage.');
});

app.listen( PORT, () => {
  console.log(`Server running at http://localhost:${ PORT}`);
});
