// src/controllers/user.controller.js
const Signup = require('../models/Signup');
const UserProgress = require('../models/UserProgress');
const Leaderboard = require('../models/Leaderboard');

exports.getUserCurrentRank = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const signupUser = await Signup.findOne({ email });
    if (!signupUser) {
      return res.status(404).json({ error: 'Signup user not found' });
    }

    const leaderboardEntry = await Leaderboard.findOne({ email });
    if (!leaderboardEntry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }

    const progress = await UserProgress.findOne({ user: signupUser._id });
    if (!progress) {
      return res.status(404).json({ error: 'User progress not found' });
    }

    const data = {
      name: signupUser.name,
      points: leaderboardEntry.points,
      level: progress.level,
      xp: progress.xp,
      xp_next_level: progress.xp_next_level,
      xp_progress_percent: progress.xp_progress_percent,
      streak_days: progress.streak_days,
      badge: progress.badge
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};