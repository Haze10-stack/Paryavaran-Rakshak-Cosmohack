// src/models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  theme: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    default: null
  },
  thumbnail: {
    type: String,
    default: null
  },
  video: {
    type: String,
    default: null
  },
  video_url: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);