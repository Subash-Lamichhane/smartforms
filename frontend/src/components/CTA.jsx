import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="px-24 lg:px-96 flex justify-center items-center my-24">
      <div className="bg-custom-blue/10 py-10 rounded-3xl flex w-full flex-col justify-center items-center px-8 lg:px-32 space-y-6">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center">
          Automate your forms effortlessly.
        </h2>
        <p className="text-md text-gray-600 text-center">
          Save time with SmartForms powered by CopilotKit.
        </p>
        <button className="bg-custom-blue hover:bg-blue-600 transition duration-300 text-white font-semibold px-6 py-3 rounded-full text-lg flex items-center gap-2 shadow-md tracking-wider">
          <Link to="/smartforms/create">Launch SmartForm</Link>
          <GoArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default CTA;
