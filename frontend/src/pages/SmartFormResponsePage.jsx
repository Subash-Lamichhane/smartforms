import { useState } from "react";
import axios from "axios";
import SmartFormResponseLogin from "../components/SmartFormResponseLogin";
import SmartFormResponse from "../components/SmartFormResponse";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const SmartFormResponsePage = () => {
  const [results, setResults] = useState(null); // To store the fetched quiz results
  const [error, setError] = useState(null); // To handle any errors

  // Handle form submission
  const handleSubmit = async (quizId, password) => {
    try {
      const response = await axios.post("http://localhost:3000/quiz/results", {
        quizId,
        password,
      });

      // Save the fetched results to state
      setResults(response.data);
      setError(null); // Clear any existing errors
    } catch (err) {
      console.log(err);
      setError("Invalid quiz ID or password. Please try again.");
      setResults(null);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-[80vh]">
        {!results ? (
          // Display the form to enter quiz ID and password if no results are fetched yet
          <SmartFormResponseLogin error={error} handleSubmit={handleSubmit} />
        ) : (
          <SmartFormResponse results={results} setResults={setResults} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default SmartFormResponsePage;
