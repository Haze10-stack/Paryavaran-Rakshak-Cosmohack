// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const Signup = require('../models/Signup');
const Leaderboard = require('../models/Leaderboard');
const UserProgress = require('../models/UserProgress');

exports.register = async (req, res) => {
  try {
    const { name, email, role, institution, password } = req.body;

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Signup({
      name,
      email,
      role,
      institution,
      password: hashedPassword
    });

    await user.save();

    await Leaderboard.create({ email: user.email, points: 0 });

    await UserProgress.create({
      user: user._id,
      level: 1,
      xp: 0,
      xp_next_level: 1000,
      streak_days: 0,
      last_active: new Date()
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      institution: user.institution
    };

    res.json({ message: 'Login successful', user: userResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};