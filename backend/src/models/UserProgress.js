// src/models/UserProgress.js
const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true,
    unique: true
  },
  level: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  xp_next_level: {
    type: Number,
    default: 1000
  },
  streak_days: {
    type: Number,
    default: 0
  },
  last_active: {
    type: Date,
    default: Date.now
  },
  badge: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

userProgressSchema.virtual('xp_progress_percent').get(function() {
  if (this.xp_next_level > 0) {
    return Math.min(Math.floor((this.xp / this.xp_next_level) * 100), 100);
  }
  return 0;
});

userProgressSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);