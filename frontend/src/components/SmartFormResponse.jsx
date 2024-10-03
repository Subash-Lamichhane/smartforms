const SmartFormResponse = ({ results, setResults }) => {
  return (
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
  );
};

export default SmartFormResponse;
