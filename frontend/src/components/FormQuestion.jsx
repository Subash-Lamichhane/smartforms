import PropTypes from "prop-types";
import { useState } from "react";
import { FaCheck } from "react-icons/fa"; // Importing check icon from react-icons

const FormQuestion = ({
  question,
  options,
  selectedOption,
  onSelect,
  onNext,
}) => {
  const [hasSelected, setHasSelected] = useState(false);

  const handleSelect = (index) => {
    onSelect(index);
    setHasSelected(true);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-4 text-left flex justify-start items-center rounded-lg border transition-shadow duration-300 shadow-md hover:border-green-500 ${
              selectedOption === index
                ? "bg-green-100 border-green-500"
                : "bg-gray-100"
            }`}
            onClick={() => handleSelect(index)}
          >
            {selectedOption === index ? (
              <span className="text-green-500 bg-green-100 mr-2 w-8 h-8 flex justify-center items-center">
                <FaCheck size={25} />
              </span>
            ) : (
              <span
                className={`p-3 font-bold mr-2 w-8 h-8 flex justify-center items-center rounded-md ${
                  selectedOption === index
                    ? "text-green-500 bg-green-100"
                    : "text-custom-blue bg-custom-blue/25"
                }`}
              >
                {index + 1}
              </span>
            )}
            {option}
          </button>
        ))}
      </div>

      {/* Placeholder to prevent UI movement */}
      <div className="mt-6 flex justify-between items-center w-full h-10">
        {hasSelected ? (
          <>
            <p className="text-gray-500">Press or click any key to continue</p>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer"
              onClick={() => {
                setHasSelected(false);
                onNext();
              }}
            >
              Next
            </button>
          </>
        ) : (
          <div className="flex justify-between items-center w-full">
            {/* Empty space to avoid UI jump */}
            <div className="invisible">
              <p className="text-gray-500">
                Press or click any key to continue
              </p>
            </div>
            <div className="invisible">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

FormQuestion.propTypes = {
  question: PropTypes.string.isRequired, // Question is required and should be a string
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // Options should be an array of strings
  selectedOption: PropTypes.number, // Selected option is a number (index)
  onSelect: PropTypes.func.isRequired, // onSelect is required and should be a function
  onNext: PropTypes.func.isRequired, // onNext is required and should be a function
};

export default FormQuestion;
