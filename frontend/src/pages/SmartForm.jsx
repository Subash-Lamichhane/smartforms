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
        const response = await axios.get("/data/form.json");
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

  // Move to the next question
  const handleNext = () => {
    if (selectedOption !== null) {
      // Save the current answer
      const currentAnswer =
        smartFormData.questions[currentQuestionIndex].options[selectedOption];
      setAnswers((prevAnswers) => [...prevAnswers, currentAnswer]);

      // If it's not the last question, move to the next one
      if (currentQuestionIndex < smartFormData.questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null); // Reset selected option for the new question

        // Update the progress bar
        setProgress(
          ((currentQuestionIndex + 1) / smartFormData.questions.length) * 100
        );
      } else {
        // If it's the last question, submit the smartForm
        handleSubmit();
      }
    }
  };

  // Submit the smartForm and store the result
  const handleSubmit = async () => {
    const submissionData = {
      smartFormId: smartFormData._id,
      studentName: userName, // Use the dynamic user name
      answers: answers,
    };

    console.log(submissionData);

    // Mocked response instead of using axios.post
    const mockResponse = {
      message: "SmartForm submitted successfully.",
      score: 100, // Mock score
      correctAnswers: 4,
      totalQuestions: 6,
    };

    setResult(mockResponse);

    // Simulate a delay like an API call
    setTimeout(() => {
      console.log("SmartForm submitted. Score:", mockResponse.score);

      // Store result in a local variable (simulating storing in public/data)
      const resultData = {
        score: mockResponse.score,
        answers: answers,
      };

      console.log("Result Data:", resultData);
    }, 500);
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
                smartFormName={smartFormData.name}
                totalQuestions={smartFormData.questions.length}
                correctAnswers={result.correctAnswers}
                wrongAnswers={result.totalQuestions - result.correctAnswers}
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
