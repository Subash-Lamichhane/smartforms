const express = require('express');
const { addQuiz, getQuizByIdentifier, updateQuiz, deleteQuizByIdentifier } = require('../controllers/quizController');

const router = express.Router();

// Route for adding a new quiz
// Example 
// Body = {
//     "identifier": "math-quiz-001",
//     "questions": [
//         {
//             "question": "What is the value of 2 + x = 4?",
//             "options": ["1", "2", "3", "4"],
//             "hint": "Subtract 2 from 4.",
//             "answer": "2"                    Here 2 is the not the index of options rather it is actual answer
//         }
//     ]
// }
router.post('/add', addQuiz);

// Route for getting a quiz by identifier
// Example: http://localhost:3000/api/quiz/math-quiz-001
router.get('/:identifier', getQuizByIdentifier);

// Route for updating a quiz by identifier
// Example: http://localhost:3000/api/quiz/math-quiz-001
// Body portion same as addQuiz
router.put('/:identifier', updateQuiz);

// Route for deleting a quiz by identifier
// Example: http://localhost:3000/api/quiz/math-quiz-001

router.delete('/:identifier', deleteQuizByIdentifier);


// router.post('/copilotkit', copilotKitProvider)
module.exports = router;
