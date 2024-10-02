import React, { useState } from 'react'

const SmartFormSubmit = () => {
    const [quizPassword, setQuizPassword] = useState("");
    const [quizId, setQuizId] = useState(null);
    const [quizName, setQuizName] = useState("");

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
            {quizId && (
                <div className="mt-6 text-center text-green-600 my-32">
                    <h3 className="text-2xl font-semibold">Quiz Saved Successfully!</h3>
                    <p className="mt-2">Quiz ID: {quizId}</p>
                </div>
            )}
        </div>
    )
}

export default SmartFormSubmit