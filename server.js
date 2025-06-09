// server.js

const express = require('express');
const path = require('path');
const sequelize = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// parse JSON and url-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes (e.g. GET /api/goal, PUT /api/goal, GET /api/videos)
app.use('/api', apiRoutes);

// serve the main site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// serve the admin page at /admin
app.get('/admin', (req, res) => {
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


