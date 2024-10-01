const Quiz = require('../models/quizModel');
const { CopilotRuntime, GoogleGenerativeAIAdapter, copilotRuntimeNodeHttpEndpoint } = require("@copilotkit/runtime");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Add a new quiz
exports.addQuiz = async (req, res) => {
    const { identifier, questions } = req.body;

    try {
        const existingQuiz = await Quiz.findOne({ identifier });
        if (existingQuiz) {
            return res.status(400).json({ message: 'Quiz with this identifier already exists.' });
        }

        const newQuiz = new Quiz({ identifier, questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a quiz by identifier
exports.getQuizByIdentifier = async (req, res) => {
    const { identifier } = req.params;

    try {
        const quiz = await Quiz.findOne({ identifier });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deleteQuizByIdentifier = async (req, res) => {
    const { identifier } = req.params
    try {
        const quiz = await Quiz.findOneAndDelete({ identifier });
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        return res.status(200).json({ message: 'Quiz successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateQuiz = async (req, res) => {
    const { identifier } = req.params;
    const { questions } = req.body;
    try {
        const quiz = await Quiz.findOneAndUpdate(
            { identifier },
            { questions },
            { new: true, runValidators: true }
        );

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.copilotKitProvider = async (req, res) => {
//     // Initialize the GoogleGenerativeAIAdapter with the genAI instance
//     const serviceAdapter = new GoogleGenerativeAIAdapter({ model: genAI.getGenerativeModel({ model: "gemini-pro" }) });

//     // Initialize the CopilotRuntime
//     const runtime = new CopilotRuntime();

//     // Set up the handler for the Copilot Kit endpoint
//     const handler = copilotRuntimeNodeHttpEndpoint({
//         endpoint: "/api", // Ensure the endpoint matches your request route
//         runtime,
//         serviceAdapter,
//     });

//     // Return the handler, which processes the request
//     return handler(req, res);
// }