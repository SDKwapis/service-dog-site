const express = require('express');
const path = require('path');
const sequelize = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// parse JSON and url-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve all files in /public (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// mount your API endpoints (e.g. GET /api/goal, /api/videos)
app.use('/api', apiRoutes);

// serve your front-end
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// sync models & launch
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

