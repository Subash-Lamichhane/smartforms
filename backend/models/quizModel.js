const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    identifier: { 
        type: String, 
        required: true, 
        unique: true 
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

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
