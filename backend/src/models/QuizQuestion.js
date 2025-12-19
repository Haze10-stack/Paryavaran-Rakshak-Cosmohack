// src/models/QuizQuestion.js
const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  quiz_name: {
    type: String,
    required: true,
    maxlength: 200
  },
  quiz_question: {
    type: String,
    required: true
  },
  quiz_option_1: {
    type: String,
    required: true,
    maxlength: 500
  },
  quiz_option_2: {
    type: String,
    required: true,
    maxlength: 500
  },
  quiz_option_3: {
    type: String,
    required: true,
    maxlength: 500
  },
  quiz_option_4: {
    type: String,
    required: true,
    maxlength: 500
  },
  correct_answer: {
    type: String,
    required: true,
    maxlength: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);