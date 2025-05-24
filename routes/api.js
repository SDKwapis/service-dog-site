const express = require('express');
const router = express.Router();
const { models } = require('../models');

// Get current goal progress
router.get('/goal', async (req, res) => {
  const goal = await models.Goal.findOne();
  if (!goal) return res.status(404).json({ error: 'Goal not found' });
  res.json(goal);
});

// Get all video testimonials
router.get('/videos', async (req, res) => {
  const videos = await models.Video.findAll();
  res.json(videos);
});

module.exports = router;

