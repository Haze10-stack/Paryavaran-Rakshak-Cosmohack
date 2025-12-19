// src/controllers/quiz.controller.js
const QuizQuestion = require('../models/QuizQuestion');
const UserQuizResult = require('../models/UserQuizResult');
const UserProgress = require('../models/UserProgress');
const Signup = require('../models/Signup');

exports.getQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    const data = questions.map(q => ({
      id: q._id,
      quiz_name: q.quiz_name,
      quiz_question: q.quiz_question,
      quiz_option_1: q.quiz_option_1,
      quiz_option_2: q.quiz_option_2,
      quiz_option_3: q.quiz_option_3,
      quiz_option_4: q.quiz_option_4,
      correct_answer: q.correct_answer
    }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionDetail = async (req, res) => {
  try {
    const { pk } = req.params;
    const q = await QuizQuestion.findById(pk);
    
    if (!q) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json({
      id: q._id,
      quiz_name: q.quiz_name,
      quiz_question: q.quiz_question,
      quiz_option_1: q.quiz_option_1,
      quiz_option_2: q.quiz_option_2,
      quiz_option_3: q.quiz_option_3,
      quiz_option_4: q.quiz_option_4,
      correct_answer: q.correct_answer
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.storeQuizResult = async (req, res) => {
  try {
    const { email, quiz_name } = req.query;

    if (!email || !quiz_name) {
      return res.status(400).json({ error: 'Email and quiz_name are required' });
    }

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let result = await UserQuizResult.findOne({
      user: user._id,
      quiz_name: quiz_name
    });

    if (!result) {
      result = new UserQuizResult({
        user: user._id,
        quiz_name: quiz_name,
        taken_at: new Date()
      });
      await result.save();

      const progress = await UserProgress.findOne({ user: user._id });
      if (progress) {
        progress.xp += 100;
        await progress.save();
      }

      return res.json({
        message: 'Quiz result stored and progress updated',
        quiz_name: result.quiz_name,
        taken_at: result.taken_at
      });
    } else {
      return res.json({
        message: 'Quiz result already exists, progress not updated',
        quiz_name: result.quiz_name,
        taken_at: result.taken_at
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};