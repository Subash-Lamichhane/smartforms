import { useState } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import axios from "axios";
import SmartFormResponseLogin from "../components/SmartFormResponseLogin";
import SmartFormResponse from "../components/SmartFormResponse";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const SmartFormResponsePage = () => {
  const [results, setResults] = useState(null); // To store the fetched quiz results
  const [quizName, setQuizName] = useState(""); // To store the quiz name
  const [error, setError] = useState(null); // To handle any errors

  // Handle form submission
  const handleSubmit = async (quizId, password) => {
    try {
      const response = await axios.post("http://localhost:3000/quiz/results", {
        quizId,
        password,
      });

      // Save the fetched results and quiz name to state
      setResults(response.data.results);
      setQuizName(response.data.quizName);
      setError(null); // Clear any existing errors
    } catch (err) {
      console.log(err);
      setError("Invalid quiz ID or password. Please try again.");
      setResults(null);
      setQuizName(""); // Reset the quiz name if there's an error
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center min-h-[80vh] w-full px-24 lg:px-96 pb-10 pt-10">
        {!results ? (
          // Display the form to enter quiz ID and password if no results are fetched yet
          <SmartFormResponseLogin error={error} handleSubmit={handleSubmit} />
        ) : (
          <>
            <CopilotKit runtimeUrl="http://localhost:3000/api">
              <div
                style={{
                  "--copilot-kit-primary-color": "#0077ff",
                }}
              >
                <CopilotPopup
                  labels={{
                    title: "Smartform Assistant",
                    initial: "Hey there! Ready to dive into your results? Ask me anything you'd like to know!",
                  }}
                />
              </div>
              {/* Display the fetched quiz name dynamically */}
              <SmartFormResponse constantResults={results} formName={quizName} />
            </CopilotKit>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SmartFormResponsePage;
