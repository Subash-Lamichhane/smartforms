import { useState } from "react";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { FaCheckCircle } from "react-icons/fa"; // Importing the tick mark icon
import { IoCreate } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import SmartFormSubmit from "./SmartFormSubmit";
import "@copilotkit/react-ui/styles.css";

const GenerateSmartFormExtend = () => {
    const [quizzes, setQuizzes] = useState([
        {
          "question": "What is the value of 2 + 2?",
          "options": ["1", "2", "3", "4"],
          "hint": "Think of the basic addition.",
          "answer": "4"
        },
        {
          "question": "What is the capital of France?",
          "options": ["Berlin", "Madrid", "Paris", "Rome"],
          "hint": "It's also known as the city of lights.",
          "answer": "Paris"
        }
      ]);
    const [editing, setEditing] = useState({ questionIndex: null, optionIndex: null }); // Track editing states
    const [tempQuestion, setTempQuestion] = useState("");
    const [tempOption, setTempOption] = useState("");
    const [submitted, setSubmitted] = useState(false)

    useCopilotReadable({
        description: "The current set of quiz questions are: ",
        value: quizzes,
    });

    useCopilotAction({
        name: "newQuizzes",
        description:
            "Provide quizzes in MCQ format based on conditions given. Do not tell questions and options in chat. Generate only the number of questions asked in the chat.",
        parameters: [
            {
                name: "newQuiz",
                type: "object[]",
                description: "The new quizzes",
                attributes: [
                    {
                        name: "question",
                        type: "string",
                        description: "The quiz question.",
                    },
                    {
                        name: "options",
                        type: "string[]",
                        description: "Four options for quiz",
                    },
                    {
                        name: "hint",
                        type: "string",
                        description: "The hint to the question.",
                    },
                    {
                        name: "answer",
                        type: "string",
                        description: "Correct answer among options.",
                    },
                ],
            },
        ],
        handler: async ({ newQuiz }) => {
            let updatedQuizzes = [];
            updatedQuizzes = [...updatedQuizzes, ...newQuiz];
            setQuizzes(updatedQuizzes);
        },
        render: "Generating your quiz...",
    });

    const handleQuestionEdit = (index) => {
        setEditing({ questionIndex: index, optionIndex: null });
        setTempQuestion(quizzes[index].question);
    };

    const handleOptionEdit = (questionIndex, optionIndex) => {
        setEditing({ questionIndex, optionIndex });
        setTempOption(quizzes[questionIndex].options[optionIndex]);
    };

    const handleSaveQuestion = (index) => {
        const updatedQuizzes = quizzes.map((quiz, idx) =>
            idx === index ? { ...quiz, question: tempQuestion } : quiz
        );
        setQuizzes(updatedQuizzes);
        setEditing({ questionIndex: null, optionIndex: null });
    };

    const handleSaveOption = (questionIndex) => {
        const updatedQuizzes = quizzes.map((quiz, idx) =>
            idx === questionIndex
                ? {
                    ...quiz,
                    options: quiz.options.map((option, idx2) =>
                        idx2 === editing.optionIndex ? tempOption : option
                    ),
                }
                : quiz
        );
        setQuizzes(updatedQuizzes);
        setEditing({ questionIndex: null, optionIndex: null });
    };

    return (
        <div className="px-24 lg:px-96  py-4 space-y-10">
            {submitted ?
                <SmartFormSubmit quizzes={quizzes}/>
                :
                <>
                    {/* Oneliner message with icon */}
                    <div className="mt-10">
                        <div className="flex ">
                            <span className="font-black text-xs text-custom-blue flex justify-center items-end gap-1 my-2">
                                <IoCreate className="text-lg" />
                                <span className="tracking-wider">
                                    Create with ease with Copilotkit
                                </span>
                            </span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-3xl font-black">Create Smart Forms</h1>
                    </div>

                    <div className="space-y-4 min-h-[50vh]">
                        {quizzes.length > 0 ? (

                            quizzes.map((quiz, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                                    {editing.questionIndex === index && !editing.optionIndex && editing.optionIndex != 0 ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={tempQuestion}
                                                onChange={(e) => setTempQuestion(e.target.value)}
                                                className="border p-2 rounded w-full mb-2"
                                            />
                                            <button
                                                onClick={() => handleSaveQuestion(index)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                                            >
                                                Save Question
                                            </button>
                                        </div>
                                    ) : (
                                        <div className=" flex justify-between group cursor-pointer">
                                            <h3
                                                onDoubleClick={() => handleQuestionEdit(index)}
                                                className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
                                            >
                                                {index + 1}. {quiz.question}
                                            </h3>
                                            <div className="mr-4 text-xl cursor-pointer text-gray-800 hidden group-hover:block" onClick={() => { handleQuestionEdit(index) }}><MdEdit /></div>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-3">
                                        {quiz.options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-3 rounded-md flex items-center text-gray-700 ${option === quiz.answer ? "bg-green-50" : "bg-gray-100"
                                                    }`}
                                            >
                                                {editing.optionIndex === idx && editing.questionIndex === index ? (
                                                    <div className="flex items-center">
                                                        <input
                                                            type="text"
                                                            value={tempOption}
                                                            onChange={(e) => setTempOption(e.target.value)}
                                                            className="border p-2 rounded w-full mr-2"
                                                        />
                                                        <button
                                                            onClick={() => handleSaveOption(index)}
                                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-between w-full group cursor-pointer">
                                                        <div
                                                            onDoubleClick={() => handleOptionEdit(index, idx)}
                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            {option === quiz.answer ? (
                                                                <FaCheckCircle className="text-green-500 mr-2" />
                                                            ) : (
                                                                <span className="bg-custom-blue/10 text-custom-blue w-6 h-6 flex items-center justify-center rounded-md mr-2 text-sm">
                                                                    {idx + 1}
                                                                </span>
                                                            )}
                                                            <span className="text-sm">{option}</span>
                                                        </div>
                                                        <div className="mr-4 text-xl cursor-pointer text-gray-800 hidden group-hover:block" onClick={() => { handleOptionEdit(index, idx) }}><MdEdit /></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))

                        ) : (
                            <div className="flex justify-start items-center">
                                <div className="text-gray-700 text-sm">
                                    <p className="mb-4">
                                        With CopilotKit, you can easily start building{" "}
                                        <strong>interactive</strong> and{" "}
                                        <strong>intelligent Smart Forms</strong> without any hassle.
                                        Whether you want to create quizzes, surveys, or any type of form,
                                        CopilotKit is here to help.
                                    </p>
                                    <p className="mb-4">
                                        Here are some of the benefits of using CopilotKit:
                                    </p>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>
                                            <strong>Easy to Use:</strong> No complicated setups or technical
                                            skills required.
                                        </li>
                                        <li>
                                            <strong>Powerful AI Assistance:</strong> Get guidance throughout
                                            the entire process.
                                        </li>
                                        <li>
                                            <strong>Focus on Your Ideas:</strong> Let CopilotKit handle the
                                            heavy lifting while you concentrate on what matters most.
                                        </li>
                                    </ul>
                                    <p>
                                        So why wait? <strong>Get started</strong> today by generating your
                                        first Smart Form and see how easy it is to bring your ideas to
                                        life. With CopilotKit, creating forms has never been this
                                        effortless!
                                    </p>
                                </div>
                            </div>
                        )}
                        {quizzes.length > 0 &&
                            <div className="w-full flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-custom-blue/90 text-white font-bold px-6 py-2 rounded-lg tracking-widest hover:bg-custom-blue transition duration-300 my-6"
                                    onClick={() => { setSubmitted(true) }}
                                >
                                    Submit
                                </button>
                            </div>}
                    </div>
                </>
            }
        </div>
    );
};


export default GenerateSmartFormExtend;