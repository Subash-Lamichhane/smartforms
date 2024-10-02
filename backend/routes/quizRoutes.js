const express = require('express');
const { addQuiz, getQuizById, submitQuiz, getQuizResults } = require('../controllers/quizController');

const router = express.Router();

// Route for adding a new quiz
router.post('/add', addQuiz);

// Route for getting a quiz by identifier
router.get('/:id', getQuizById);

// Route to submit quiz answers
router.post('/submit', submitQuiz);

// Route to get quiz results by quiz ID and password
router.post('/results', getQuizResults);

module.exports = router;
