// src/models/UserVideoProgress.js
const mongoose = require('mongoose');

const userVideoProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  theme: {
    type: String,
    required: true,
    maxlength: 100
  },
  progress: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

userVideoProgressSchema.index({ user: 1, video: 1 }, { unique: true });

module.exports = mongoose.model('UserVideoProgress', userVideoProgressSchema);