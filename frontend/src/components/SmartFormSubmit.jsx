import { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import SmartFormSuccess from "./SmartFormSuccess";

const SmartFormSubmit = ({ quizzes }) => {
  const [quizPassword, setQuizPassword] = useState("");
  const [quizId, setQuizId] = useState("");
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
    console.log(quizData);
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
        setQuizId(result._id); // Set the saved quiz ID
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="pb-20 min-h-[70vh] flex justify-center items-center">
      <div className="p-6 pt-10 flex flex-col items-center">
        {!quizId ? (
          <>
            <div className="space-y-1 text-center">
              <div className="flex items-center space-x-2 justify-center text-xs">
                <IoCloudUpload className="text-custom-blue" size={20} />
                <span className="font-semibold text-custom-blue uppercase tracking-widest text-xs">
                  Save your SmartForms
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                Save your SmartForms
              </h1>
            </div>
            <div className="mt-8 space-y-4 w-full max-w-sm">
              <input
                type="text"
                placeholder="Form Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                className="border border-custom-blue rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue w-64 md:w-80 lg:w-96"
              />
              <input
                type="password"
                placeholder="Form Password"
                value={quizPassword}
                onChange={(e) => setQuizPassword(e.target.value)}
                className="border border-custom-blue rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue w-64 md:w-80 lg:w-96"
              />
              <button
                onClick={handleSaveQuiz}
                className="w-full py-3 bg-custom-blue font-black tracking-widest text-white rounded-lg hover:bg-custom-blue/80 transition duration-300 ease-in-out text-base"
              >
                Save SmartForm
              </button>
            </div>
          </>
        ) : (
          <SmartFormSuccess quizId={quizId} quizName={quizName} />
        )}
      </div>
    </div>
  );
};

export default SmartFormSubmit;
