// ./controllers/quizController.js

const { Quiz, Result } = require('../models/quizModel'); 

// Add a new quiz
exports.addQuiz = async (req, res) => {
    const { name, password, questions } = req.body;

    try {
        const newQuiz = new Quiz({ name, password, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuizById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find quiz by MongoDB _id
        const quiz = await Quiz.findById(id).lean();  

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        // Modify quiz object to remove 'answer' from each question
        const sanitizedQuiz = {
            ...quiz,
            questions: quiz.questions.map((q) => {
                const { answer, ...rest } = q.toObject ? q.toObject() : q; 
                return rest;
            }),
        };

        res.json(sanitizedQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// API to submit answers and calculate results
exports.submitQuiz = async (req, res) => {
    const { quizId, studentName, answers } = req.body; 

    try {
        // Find the quiz by its ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        // Calculate the score, correct answers, and incorrect answers
        let score = 0;
        let correctAnswersCount = 0;
        let incorrectAnswersCount = 0;
        const correctAnswers = quiz.questions.map(q => q.answer);
        const totalQuestions = quiz.questions.length;

        // Check answers against correct answers
        answers.forEach((submittedAnswer, index) => {
            const correctAnswer = correctAnswers[index];
            if (submittedAnswer === correctAnswer) {
                correctAnswersCount += 1; 
                score += 1;               
            } else {
                incorrectAnswersCount += 1; 
            }
        });

        const percentageScore = (score / totalQuestions) * 100;

        // Check if result for this quiz already exists
        let result = await Result.findOne({ quizId });
        if (!result) {
            result = new Result({
                quizId,
                students: []
            });
        }

        // Add student name, score, correct/incorrect answers to results
        result.students.push({ 
            name: studentName, 
            score: percentageScore,
            correctAnswersCount,   
            incorrectAnswersCount  
        });

        await result.save();

        res.status(201).json({
            message: 'Quiz submitted successfully.',
            score: percentageScore,
            correctAnswersCount,   
            incorrectAnswersCount  
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getQuizResults = async (req, res) => {
    const { quizId, password } = req.body;

    try {
        // Find the quiz by its ID and password
        const quiz = await Quiz.findById(quizId);
        if (!quiz || quiz.password !== password) {
            return res.status(401).json({ message: 'Invalid quiz ID or password.' });
        }

        // Find the result for the quiz
        const result = await Result.findOne({ quizId });
        if (!result) {
            return res.status(404).json({ message: 'No results found for this quiz.' });
        }

        // Return the quiz name and the results, including correct and incorrect answers count
        res.json({
            quizName: quiz.name,
            results: result.students
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};