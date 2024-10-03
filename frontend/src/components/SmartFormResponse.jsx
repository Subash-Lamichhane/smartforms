import { useState } from "react";
import { SiOpenaccess } from "react-icons/si";

const SmartFormResponse = ({ results, setResults, formName }) => {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query
  const [sortKey, setSortKey] = useState("name"); // Key to sort by
  const [sortDirection, setSortDirection] = useState("ascending"); // Sorting direction
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;

  // Handle search
  const filteredResults = results.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sorting
  const sortedResults = filteredResults.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortDirection === "ascending" ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortDirection === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastResult = currentPage * itemsPerPage;
  const indexOfFirstResult = indexOfLastResult - itemsPerPage;
  const currentResults = sortedResults.slice(indexOfFirstResult, indexOfLastResult);

  // Handle sort change via buttons
  const handleSort = (key) => {
    setSortKey(key);
    setSortDirection((prev) =>
      prev === "ascending" ? "descending" : "ascending"
    );
  };

  // Pagination handlers
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-5xl ">
      {/* One-liner */}
      <div className="mb-4 flex items-center text-xs text-custom-blue font-semibold">
        <SiOpenaccess size={15} />
        <span>Access your responses securely.</span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        {formName} Responses
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400 transition duration-200"
        />
      </div>

      {/* Sort Buttons */}
      <div className="flex mb-4 space-x-3 tracking-wider">
        <button
          onClick={() => handleSort("name")}
          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none transition-all duration-200 ${
            sortKey === "name"
              ? "bg-blue-500 text-white"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Sort by Name {sortKey === "name" && (sortDirection === "ascending" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("score")}
          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none transition-all duration-200 ${
            sortKey === "score"
              ? "bg-blue-500 text-white"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Sort by Score {sortKey === "score" && (sortDirection === "ascending" ? "↑" : "↓")}
        </button>
      </div>

      {/* Table for displaying results */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="text-gray-700 bg-gray-100 uppercase">
            <tr>
              <th className="px-6 py-4 border-b">Name</th>
              <th className="px-6 py-4 border-b">Score</th>
              <th className="px-6 py-4 border-b">Correct Answers</th>
              <th className="px-6 py-4 border-b">Incorrect Answers</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {currentResults.length > 0 ? (
              currentResults.map((result) => (
                <tr key={result._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 border-b">{result.name}</td>
                  <td className="px-6 py-4 border-b">{result.score}</td>
                  <td className="px-6 py-4 border-b">{result.correctAnswersCount}</td>
                  <td className="px-6 py-4 border-b">{result.incorrectAnswersCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Check Another Form Button */}
      <button
        onClick={() => setResults(null)} // Reset to ask for ID and password again
        className="mt-8 w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Check Another Form's Response
      </button>
    </div>
  );
};

export default SmartFormResponse;
