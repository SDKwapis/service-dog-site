// server.js with full admin functionality including add, subtract, and set
const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./models');
const apiRoutes = require('./routes/api');
const { Goal } = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'connor_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/admin', (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, 'views/admin.html'));
  } else {
    res.sendFile(path.join(__dirname, 'views/login.html'));
  }
});

app.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === 'connor2025') {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

app.post('/admin/goal', async (req, res) => {
  if (!req.session.authenticated) return res.status(401).json({ error: 'Unauthorized' });

  const { action, amount } = req.body;
  const goal = await Goal.findOne();

  if (!goal) return res.status(404).json({ error: 'Goal not found' });

  if (action === 'add') {
    goal.current += amount;
  } else if (action === 'subtract') {
    goal.current = Math.max(0, goal.current - amount);
  } else if (action === 'set') {
    goal.current = amount;
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }

  await goal.save();
  res.json({ success: true, current: goal.current });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});



