
require('dotenv').config();           
const express = require('express');
const path = require('path');
const sequelize = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic Auth middleware
function basicAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required.');
  }
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required.');
  }
  const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
  return res.status(401).send('Invalid credentials.');
}

// parse JSON and url-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes (e.g. GET /api/goal, PUT /api/goal, GET /api/videos)
app.use('/api', apiRoutes);

// main site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// **protected** admin panel
app.get('/admin', basicAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });



