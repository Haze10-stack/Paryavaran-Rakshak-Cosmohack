// src/controllers/leaderboard.controller.js
const Leaderboard = require('../models/Leaderboard');
const Signup = require('../models/Signup');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboardEntries = await Leaderboard.find().sort({ points: -1 });

    const result = [];
    for (const entry of leaderboardEntries) {
      try {
        const user = await Signup.findOne({ email: entry.email });
        result.push({
          name: user ? user.name : entry.email,
          points: entry.points
        });
      } catch (err) {
        result.push({
          name: entry.email,
          points: entry.points
        });
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoints = async (req, res) => {
  try {
    const { email, points } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let leaderboard = await Leaderboard.findOne({ email });
    if (!leaderboard) {
      leaderboard = new Leaderboard({ email, points: 0 });
    }

    leaderboard.points += parseInt(points || 0);
    await leaderboard.save();

    const fullLeaderboard = await Leaderboard.find().sort({ points: -1 });
    res.json(fullLeaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};