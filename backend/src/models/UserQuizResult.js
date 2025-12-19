// src/models/UserQuizResult.js
const mongoose = require('mongoose');

const userQuizResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true
  },
  quiz_name: {
    type: String,
    required: true,
    maxlength: 255
  },
  taken_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

userQuizResultSchema.index({ user: 1, quiz_name: 1 }, { unique: true });

module.exports = mongoose.model('UserQuizResult', userQuizResultSchema);