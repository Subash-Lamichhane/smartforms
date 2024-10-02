import { useState } from "react";
import PropTypes from "prop-types"; 
import { FaQuestionCircle } from "react-icons/fa";
import { faqs } from "../constants/faqs";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 mx-6">
      <div
        className="flex justify-between items-center py-3 cursor-pointer hover:bg-gray-100 transition duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-800 text-sm">
          {question}
        </span>
        <span className="text-gray-500">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="pb-4 text-gray-500 text-sm">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

const FAQ = () => {
  return (
    <div className="my-16 px-96 bg-white">
      <div className="flex flex-col items-start justify-center space-y-2 mb-6">
        <div className="text-sm font-bold text-custom-blue flex justify-start items-center gap-1">
          <FaQuestionCircle />
          <span>FAQs</span>
        </div>
        <h2 className="text-3xl font-bold">Got Questions?</h2>
      </div>
      <div className="rounded-2xl bg-stone-100 mt-16 py-3">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

FAQ.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
};

export default FAQ;
