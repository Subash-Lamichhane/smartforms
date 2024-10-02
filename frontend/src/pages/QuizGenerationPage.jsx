import { useState } from 'react';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const QuizGenerationPage = () => {
    return (
        <CopilotKit runtimeUrl="http://localhost:3000/api">
            <div
                style={{
                    "--copilot-kit-primary-color": "black",
                }}
            >
                <CopilotPopup
                    labels={{
                        title: "Your Assistant",
                        initial: "Hi! Ask me anything?",
                    }}
                />
            </div>
            <QuizGenerationPageExtend />
        </CopilotKit>
    );
};

const QuizGenerationPageExtend = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [quizName, setQuizName] = useState("");  // State for quiz name
    const [quizPassword, setQuizPassword] = useState("");  // State for quiz password
    const [quizId, setQuizId] = useState(null);  // State for saved quiz ID

    useCopilotReadable({
        description: "The current set of quiz questions are: ",
        value: quizzes,
    });

    useCopilotReadable({
        description: "This is the set of quizzes: ",
        value: quizzes,
    });

    useCopilotAction({
        name: "newQuizzes",
        description: "Provide quizzes in MCQ format based on conditions given. Do not tell questions and options in chat. Generate only the number of questions asked in the chat.",
        parameters: [
            {
                name: "newQuiz",
                type: "object[]",
                description: "The new quizzes",
                attributes: [
                    {
                        name: 'question',
                        type: 'string',
                        description: 'The quiz question.'
                    },
                    {
                        name: "options",
                        type: "string[]",
                        description: "The options for quiz",
                    },
                    {
                        name: 'hint',
                        type: 'string',
                        description: 'The hint to the question.'
                    },
                    {
                        name: 'answer',
                        type: 'string',
                        description: 'Correct answer among options.'
                    },
                ]
            },
        ],
        handler: async ({ newQuiz }) => {
            let updatedQuizzes = [];
            updatedQuizzes = [...updatedQuizzes, ...newQuiz];
            setQuizzes(updatedQuizzes);
        },
        render: "Generating your quiz...",
    });

    const handleSaveQuiz = async () => {
        if (!quizName || !quizPassword) {
            alert("Please provide both the quiz name and password.");
            return;
        }

        const quizData = {
            name: quizName,
            password: quizPassword,
            questions: quizzes,
        };
        console.log(quizData)
        try {
            const response = await fetch("http://localhost:3000/quiz/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quizData),
            });

            const result = await response.json();

            if (response.ok) {
                setQuizId(result._id);  // Set the saved quiz ID
                alert("Quiz saved successfully!");
            } else {
                alert("Error saving quiz: " + result.message);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 font-sans">
            <h1 className="text-center text-4xl font-bold text-gray-800 mb-6">Quiz Generator</h1>

            <div className="space-y-6">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <h3 className="text-lg font-semibold">Question: {quiz.question}</h3>
                            <ul className="list-disc list-inside mt-2">
                                {quiz.options.map((option, idx) => (
                                    <li key={idx}>{option}</li>
                                ))}
                            </ul>
                            <p className="mt-2"><strong>Hint:</strong> {quiz.hint}</p>
                            <p><strong>Answer:</strong> {quiz.answer}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No quizzes available. Generate quizzes first!</p>
                )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Save Your Quiz</h3>
                <input
                    type="text"
                    placeholder="Quiz Name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="password"
                    placeholder="Quiz Password"
                    value={quizPassword}
                    onChange={(e) => setQuizPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleSaveQuiz}
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                    Save Quiz
                </button>
            </div>

            {quizId && (
                <div className="mt-6 text-center text-green-600 my-32">
                    <h3 className="text-2xl font-semibold">Quiz Saved Successfully!</h3>
                    <p className="mt-2">Quiz ID: {quizId}</p>
                </div>
            )}
        </div>
    );
};

export default QuizGenerationPage;
