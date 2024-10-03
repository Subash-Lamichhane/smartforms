import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useState } from "react";
import { SiOpenaccess } from "react-icons/si";

const SmartFormResponse = ({ constantResults, formName }) => {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search query
  const [sortKey, setSortKey] = useState("name"); // Key to sort by
  const [sortDirection, setSortDirection] = useState("ascending"); // Sorting direction
  const [results, setResults] = useState(constantResults)
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;
  // const constantResults = results;

  useCopilotReadable({
    description: "This is the results of students:",
    value: constantResults
  })

  useCopilotAction({
    name: "manageResults",
    description: "Handle results, including filtering, sorting, and updating.",
    parameters: [
      {
        name: "action",
        type: "string",
        description: "The action to perform on the results (filter, sort, update, change, show)."
      },
      {
        name: "criteria",
        type: "object",
        description: "Criteria for filtering, sorting, or updating results.",
        attributes: [
          {
            name: "key",
            type: "string",
            description: "Key to filter or sort by."
          },
          {
            name: "value",
            type: "string|number",
            description: "Value to match for filtering or sorting."
          },
          {
            name: "condition",
            type: "string",
            description: "Condition to apply (e.g., 'equal', 'greaterThan', 'lessThan')."
          }
        ]
      }
    ],
    handler: async ({ action, criteria }) => {
      let updatedResults = [...constantResults]; // Start with the original results

  
      // Check if criteria and criteria.key exist before proceeding
      if (!criteria || !criteria.key || !criteria.condition) {
        console.log("Criteria, criteria.key, or criteria.condition is missing.");
        return;
      }
  
      // Handle different actions for filter, update, change, show
      if (["filter", "update", "change", "show"].includes(action)) {
        updatedResults = updatedResults.filter((result) => {
          const keyValue = result[criteria.key]; // Get the value by criteria key
  
          // Safeguard to ensure both keyValue and criteria.value are defined
          if (keyValue !== undefined && criteria.value !== undefined) {
            // Handle different comparison conditions
            if (criteria.condition === "equal") {
              return keyValue.toString().toLowerCase() === criteria.value.toString().toLowerCase();
            } else if (criteria.condition === "greaterThan") {
              return parseFloat(keyValue) > parseFloat(criteria.value);
            } else if (criteria.condition === "lessThan") {
              return parseFloat(keyValue) < parseFloat(criteria.value);
            } else {
              console.error("Unsupported condition:", criteria.condition);
              return false;
            }
          }
          return false; // Exclude if keyValue or criteria.value is missing
        });
      } else if (action === "sort") {
        updatedResults = updatedResults.sort((a, b) => {
          if (a[criteria.key] < b[criteria.key]) return criteria.value === "ascending" ? -1 : 1;
          if (a[criteria.key] > b[criteria.key]) return criteria.value === "ascending" ? 1 : -1;
          return 0;
        });
      }
  
      setResults(updatedResults); // Update the state
    }
  });
  
  // Handle search
  const filteredResults = results.filter((result) =>
    result.name?.toString().toLowerCase().includes(searchQuery.toLowerCase())
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
          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none transition-all duration-200 ${sortKey === "name"
            ? "bg-blue-500 text-white"
            : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
        >
          Sort by Name {sortKey === "name" && (sortDirection === "ascending" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("score")}
          className={`flex-1 px-4 py-2 text-sm font-medium border rounded-lg focus:outline-none transition-all duration-200 ${sortKey === "score"
            ? "bg-blue-500 text-white"
            : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
        >
          Sort by Score {sortKey === "score" && (sortDirection === "ascending" ? "↑" : "↓")}
        </button>
      </div>

      {/* Table for displaying results */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-[0.9rem] text-left border-collapse">
          <thead className="text-gray-700 bg-gray-100 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 border-b">Name</th>
              <th className="px-6 py-4 border-b text-center">Correct Answers</th>
              <th className="px-6 py-4 border-b text-center">Incorrect Answers</th>
              <th className="px-6 py-4 border-b text-center">Score</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {currentResults.length > 0 ? (
              currentResults.map((result) => (
                <tr key={result._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 border-b">{result.name}</td>
                  <td className="px-6 py-4 border-b text-center">{result.correctAnswersCount}</td>
                  <td className="px-6 py-4 border-b text-center">{result.incorrectAnswersCount}</td>
                  <td className="px-6 py-4 border-b text-center">{result.score}</td>
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
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 bg-gray-100 ${currentPage === 1 ? "text-gray-600 cursor-not-allowed " : "text-custom-blue border-custom-blue  hover:bg-gray-100"
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
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 bg-gray-100 ${currentPage === totalPages ? "text-gray-600 cursor-not-allowed" : "text-custom-blue border-custom-blue hover:bg-gray-100"
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
