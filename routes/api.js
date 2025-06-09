// routes/api.js

const express = require('express');
const router = express.Router();
const {
  models: { Goal, Video }
} = require('../models');

// GET /api/goal — fetch or create default goal
router.get('/goal', async (req, res) => {
  try {
    let goal = await Goal.findByPk(1);
    if (!goal) {
      goal = await Goal.create({ id: 1, current: 0, target: 100 });
    }
    return res.json({ current: goal.current, target: goal.target });
  } catch (error) {
    console.error('Error fetching goal:', error);
    return res.status(500).json({ error: 'Failed to fetch goal' });
  }
});

// PUT /api/goal — update current and target
router.put('/goal', async (req, res) => {
  try {
    const { current, target } = req.body;
    if (!Number.isInteger(current) || !Number.isInteger(target)) {
      return res.status(400).json({ error: 'Current and target must be integers' });
    }

    let goal = await Goal.findByPk(1);
    if (!goal) {
      goal = await Goal.create({ id: 1, current, target });
    } else {
      await goal.update({ current, target });
    }

    return res.json({ current: goal.current, target: goal.target });
  } catch (error) {
    console.error('Error updating goal:', error);
    return res.status(500).json({ error: 'Failed to update goal' });
  }
});

// GET /api/videos — fetch all video testimonials
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.findAll();
    return res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;


