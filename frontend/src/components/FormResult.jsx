import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaAward,
  FaTrophy,
} from "react-icons/fa"; // Importing icons
import { GiBullseye } from "react-icons/gi";
import { Link } from "react-router-dom";

const FormResult = ({
  quizName,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  score,
}) => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-start space-y-16 px-8">
      {/* Message above heading */}
      <div>
        <div className="flex ">
          <span className="font-black text-xs text-custom-blue flex justify-center items-center gap-1 my-2">
            <GiBullseye />
            <span className="tracking-wider">Thank you for participating!</span>
          </span>
        </div>
        {/* Quiz Name and Status */}
        <h2 className="text-5xl font-extrabold text-left tracking-wider">
          {quizName}
        </h2>
      </div>

      {/* Your Results Section */}
      <h3 className="text-3xl font-bold text-gray-800">Your Results</h3>

      {/* Study progress section */}
      <div className="w-full space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 w-full">
            <FaAward className="text-custom-blue mr-2" />
            <span className="text-gray-700 font-semibold">Total Questions</span>
            <span className="text-custom-blue text-lg font-bold">
              {totalQuestions}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 w-full">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span className="text-gray-700 font-semibold">Correct Answers</span>
            <span className="text-green-500 text-lg font-bold">
              {correctAnswers}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 w-full">
            <FaTimesCircle className="text-red-500 mr-2" />
            <span className="text-gray-700 font-semibold">
              Incorrect Answers
            </span>
            <span className="text-red-500 text-lg font-bold">
              {wrongAnswers}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 w-full">
            <FaTrophy className="text-yellow-500 mr-2" />
            <span className="text-gray-700 font-semibold">Score</span>
            <span className="text-yellow-500 text-lg font-bold">{score}%</span>
          </div>
        </div>
      </div>

      {/* Bottom message and buttons */}
      <div className="w-full flex flex-col items-center space-y-4">
        <p className="text-gray-500 text-lg">What would you like to do next?</p>
        <div className="flex space-x-4 text-md tracking-wider">
          <button className="bg-custom-blue/80 text-white font-black tracking-wider px-6 py-2 rounded-lg shadow-lg hover:bg-custom-blue/100 transition duration-300">
            <Link to="/">Explore SmartForms</Link>
          </button>
          <button className="border border-custom-blue text-custom-blue font-black px-6 py-2 rounded-lg hover:bg-custom-blue hover:text-white transition duration-300">
            <Link to="/smartforms">Try Another</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

FormResult.propTypes = {
  quizName: PropTypes.string.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  wrongAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default FormResult;
