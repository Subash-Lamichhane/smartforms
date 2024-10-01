import { useState } from 'react';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

const QuizGenerationPage = () => {
    return (
        <CopilotKit runtimeUrl="http://localhost:3000/api/quiz/copilotkit">
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
    const [quizzes, setQuizzes] = useState([
        {
            question: "What is the value of 2 + x = 4?",
            options: ["1", "2", "3", "4"],
            hint: "Subtract 2 from 4.",
            answer: "2",
        },
    ]);

    console.log(quizzes);

    useCopilotReadable({
        description: "This is the set of quizzes: ",
        value: quizzes,
    });

    useCopilotChatSuggestions({
        instructions: `The user is creating different types of quizzes.`,
    });

    useCopilotAction({
        name: "newQuestions",
        description: "Provide MCQ quizzes based on conditions given. If number of questions are not specified provide 10 of them. Do not tell questions and options in chat.",
        parameters: [
            {
                name: "newQuizzes",
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
                        description: 'Correct answer among options.'
                    },
                ]
            },
        ],
        handler: ({ newQuizzes }) => {
            setQuizzes(newQuizzes);
        },
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
