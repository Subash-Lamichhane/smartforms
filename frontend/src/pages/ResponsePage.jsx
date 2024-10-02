import React, { useState } from 'react';
import axios from 'axios';

const ResponsePage = () => {
  const [quizId, setQuizId] = useState(''); // To store the entered quiz ID
  const [password, setPassword] = useState(''); // To store the entered password
  const [results, setResults] = useState(null); // To store the fetched quiz results
  const [error, setError] = useState(null); // To handle any errors

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/quiz/results', {
        quizId,
        password
      });

      // Save the fetched results to state
      setResults(response.data);
      setError(null); // Clear any existing errors
    } catch (err) {
      // Handle error case
      setError('Invalid quiz ID or password. Please try again.');
      setResults(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!results ? (
        // Display the form to enter quiz ID and password if no results are fetched yet
        <div className="p-8 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Quiz ID and Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Quiz ID</label>
              <input
                type="text"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Get Results
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Display the quiz results after fetching
        <div className="w-full max-w-3xl p-8 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <ul className="space-y-4">
            {results.map((result) => (
              <li key={result._id} className="border-b border-gray-200 py-4">
                <p className="text-lg font-semibold">Name: {result.name}</p>
                <p>Score: {result.score}</p>
                <p>Correct Answers: {result.correctAnswersCount}</p>
                <p>Incorrect Answers: {result.incorrectAnswersCount}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setResults(null)} // Reset to ask for ID and password again
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Check Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default ResponsePage;
