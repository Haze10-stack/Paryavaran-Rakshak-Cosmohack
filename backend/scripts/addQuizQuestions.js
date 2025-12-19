// scripts/addQuizQuestions.js
const mongoose = require('mongoose');
const QuizQuestion = require('../src/models/QuizQuestion');
require('dotenv').config();
require("dotenv").config({ path: "../.env" });


const sampleQuestions = [
  {
    quiz_name: "Nature",
    quiz_question: "What is photosynthesis?",
    quiz_option_1: "Process by which plants make food using sunlight",
    quiz_option_2: "Process of breathing in animals",
    quiz_option_3: "Movement of water in oceans",
    quiz_option_4: "Breaking down of rocks",
    correct_answer: "1"
  },
  {
    quiz_name: "Nature",
    quiz_question: "Which gas do plants absorb from the atmosphere?",
    quiz_option_1: "Oxygen",
    quiz_option_2: "Nitrogen",
    quiz_option_3: "Carbon Dioxide",
    quiz_option_4: "Hydrogen",
    correct_answer: "3"
  },
  {
    quiz_name: "Nature",
    quiz_question: "Which is the largest ecosystem on Earth?",
    quiz_option_1: "Forest",
    quiz_option_2: "Desert",
    quiz_option_3: "Freshwater",
    quiz_option_4: "Marine",
    correct_answer: "4"
  }
];


const addQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await QuizQuestion.deleteMany({}); // Clear existing
    await QuizQuestion.insertMany(sampleQuestions);
    
    console.log('Quiz questions added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addQuestions();