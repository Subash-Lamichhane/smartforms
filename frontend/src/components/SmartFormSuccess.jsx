import React from "react";
import { FiCopy } from "react-icons/fi"; // Import react-icons for the copy icon

const SmartFormSuccess = ({ quizId, quizName }) => {
  const smartFormLink = `http://localhost:5173/smartforms/${quizId}`;

  return (
    <div className="bg-white p-8">
      <h2 className="text-3xl font-bold mb-4">
        {quizName} Created Successfully!
      </h2>
      <p className="text-gray-500 mb-6">
        Your form is now live. Please save the unique ID below to access or
        manage your SmartForm in the future. You can share the link with others
        to invite them to fill out your form.
      </p>

      <div className="mb-6">
        <p className="font-semibold mb-2">Shareable Link:</p>
        <div className="relative flex items-center">
          <input
            type="text"
            value={smartFormLink}
            readOnly
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={(e) => e.target.select()}
          />
          <button
            className="absolute right-3"
            onClick={() => navigator.clipboard.writeText(smartFormLink)}
          >
            <FiCopy className="text-gray-500 hover:text-custom-blue" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">Form Access ID:</p>
        <div className="relative flex items-center">
          <input
            type="text"
            value={quizId}
            readOnly
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={(e) => e.target.select()}
          />
          <button
            className="absolute right-3"
            onClick={() => navigator.clipboard.writeText(quizId)}
          >
            <FiCopy className="text-gray-500 hover:text-custom-blue" />
          </button>
        </div>
      </div>

      <p className="text-gray-500 mb-6">
        Share your <span className="font-bold underline">smartform</span> using the link above and start collecting responses
        right away.
      </p>

      <div className="flex justify-center">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition duration-300 ease-in-out"
          onClick={() => window.open(smartFormLink, "_blank")}
        >
          Go to Form
        </button>
      </div>
    </div>
  );
};

export default SmartFormSuccess;
