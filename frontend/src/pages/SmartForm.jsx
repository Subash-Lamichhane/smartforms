import { useState, useEffect } from "react";
import { SiAnswer } from "react-icons/si";
import ProgressBar from "../components/ProgressBar";
import FormQuestion from "../components/FormQuestion";
import NavBar from "../components/NavBar";
import axios from "axios";
import FormResult from "../components/FormResult";
import UserNameEntry from "../components/UserNameEntry"; // Import UserNameEntry component

const SmartForm = () => {
  const [smartFormData, setSmartFormData] = useState(null); // Store the smartForm data from the API
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index
  const [selectedOption, setSelectedOption] = useState(null); // Store the selected option
  const [answers, setAnswers] = useState([]); // Store the user's answers
  const [progress, setProgress] = useState(0); // Progress in percentage
  const [result, setResult] = useState();
  const [userName, setUserName] = useState(""); // Store user name
  const [smartFormStarted, setSmartFormStarted] = useState(false); // Track if smartForm has started

  // Fetch the smartForm data from the backend API
  useEffect(() => {
    const fetchSmartFormData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/quiz/66fbe8c15b7a7ac76585b8ad");
        setSmartFormData(response.data); // Save the smartForm data
        setProgress(0); // Initialize the progress bar
      } catch (error) {
        console.error("Error fetching smartForm data:", error);
      }
    };

    fetchSmartFormData();
  }, []);

  // Handle when an option is selected
  const handleSelect = (index) => {
    setSelectedOption(index); // Update the selected option
  };

  const handleNext = () => {
    
    if (selectedOption !== null) {
      // Get the current answer
      const currentAnswer =
        smartFormData.questions[currentQuestionIndex].options[selectedOption];
  
      // If it's the last question, we must first save the final answer, then submit
      if (currentQuestionIndex === smartFormData.questions.length - 1) {
        // Update the answers with the final answer and then submit the form
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers, currentAnswer];
          handleSubmit(updatedAnswers); // Pass updated answers to handleSubmit
          return updatedAnswers;
        });
      } else {
        // For all other questions, simply update the answers and move to the next question
        setAnswers((prevAnswers) => [...prevAnswers, currentAnswer]);
  
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null); // Reset the selected option for the next question
  
        // Update the progress bar
        setProgress(
          ((currentQuestionIndex + 1) / smartFormData.questions.length) * 100
        );
      }
    }
  };
  
  
  const handleSubmit = async (updatedAnswers) => {
    const submissionData = {
      quizId: smartFormData._id, // Use the actual quiz ID from your smartFormData
      studentName: userName,     // Use the dynamic user name
      answers: updatedAnswers,          // The array of answers provided by the user
    };

    try {
      // Send the POST request with the correct payload
      const response = await axios.post("http://localhost:3000/quiz/submit", submissionData);
  
      // Set the result to the response from the server
      setResult(response.data);
  
      // Log the response and simulate further actions like storing the result
      // console.log("Quiz submitted. Score:", response.data);

    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  // Handle starting the smartForm
  const handleStartSmartForm = (name) => {
    setUserName(name); // Set the user name
    setSmartFormStarted(true); // Set the smartForm as started
  };

  // Display loading until smartForm data is fetched
  if (!smartFormData) {
    return <div>Loading smartForm...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="px-96 h-[80vh] flex flex-col justify-center item-center">
        {!result && (
          <div>
            <div className="flex ">
              <span className="font-black text-xs text-custom-blue flex justify-center items-center gap-1 my-2">
                <SiAnswer />
                <span className="tracking-wider">
                  Remember to answer honestly!
                </span>
              </span>
            </div>
            <div className="font-black text-5xl mb-4">{smartFormData.name}</div>
          </div>
        )}

        {!smartFormStarted ? (
          <UserNameEntry onStartSmartForm={handleStartSmartForm} /> // Render UserNameEntry
        ) : (
          <div className="space-y-8">
            {result ? (
              <FormResult
                quizName={smartFormData.name}
                totalQuestions={smartFormData.questions.length}
                correctAnswers={result.correctAnswersCount}
                wrongAnswers={result.incorrectAnswersCount}
                score={result.score}
              />
            ) : (
              <>
                <ProgressBar progress={progress} />
                <FormQuestion
                  question={
                    smartFormData.questions[currentQuestionIndex].question
                  }
                  options={
                    smartFormData.questions[currentQuestionIndex].options
                  }
                  selectedOption={selectedOption}
                  onSelect={handleSelect}
                  onNext={handleNext}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartForm;
