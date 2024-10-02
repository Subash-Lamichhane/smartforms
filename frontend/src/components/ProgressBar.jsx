import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};
