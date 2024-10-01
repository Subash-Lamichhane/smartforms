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
        // Create a new array and append new quizzes to it
        let updatedQuizzes = []
        updatedQuizzes = [...updatedQuizzes,...newQuiz];

        // Replace old quizzes with the new quizzes
        setQuizzes(updatedQuizzes);
        },
        render: "Generating your quiz...",
    });
    
    return (
        <div>
            <h1>Quiz List</h1>
            {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <h3>Question: {quiz.question}</h3>
                        <ul>
                            {quiz.options.map((option, idx) => (
                                <li key={idx}>{option}</li>
                            ))}
                        </ul>
                        <p><strong>Hint:</strong> {quiz.hint}</p>
                        <p><strong>Answer:</strong> {quiz.answer}</p>
                    </div>
                ))
            ) : (
                <p>No quizzes available.</p>
            )}
        </div>
    );
};

export default QuizGenerationPage;
