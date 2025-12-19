// src/routes/accounts.routes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const leaderboardController = require('../controllers/leaderboard.controller');
const userController = require('../controllers/user.controller');
const videoController = require('../controllers/video.controller');
const quizController = require('../controllers/quiz.controller');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Leaderboard routes
router.get('/leaderboard', leaderboardController.getLeaderboard);
router.post('/leaderboard/update', leaderboardController.updatePoints);

// User routes
router.get('/current-rank', userController.getUserCurrentRank);

// Video routes
router.get('/videos/theme/:theme', videoController.getVideosByTheme);
router.get('/user/videos/progress/:theme', videoController.getUserVideoProgress);
router.get('/user/videos/progressUpdate/:theme', videoController.saveOrGetUserVideoProgress);

// Quiz routes
router.get('/questions', quizController.getQuestions);
router.get('/questions/:pk', quizController.getQuestionDetail);
router.get('/store_quiz_result', quizController.storeQuizResult);

module.exports = router;