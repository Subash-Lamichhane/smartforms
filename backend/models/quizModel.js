const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    password: { 
        type: String, 
        required: true, 
    },
    questions: [
        {
            question: { type: String, required: true },
            options: { type: [String], required: true },
            hint: String,
            answer: { type: String, required: true }
        }
    ]
});

const resultSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    students: [
        {
            name: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            }
        }
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);
const Result = mongoose.model('Result', resultSchema);

module.exports = { Quiz, Result };