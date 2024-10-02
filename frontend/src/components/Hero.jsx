import { MdPrivacyTip } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="px-6 md:px-20 lg:px-40 xl:px-96 py-12 h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-4 text-center md:text-left">
        {/* Top Line */}
        <div className="text-custom-blue font-semibold text-sm flex justify-center md:justify-start items-center tracking-wide">
          <MdPrivacyTip className="text-xl" />
          <span className="ml-2">
            Effortless automation with CopilotKit integration.
          </span>
        </div>

        {/* Headline */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-normal">
          Revolutionize your forms with Smart, AI-powered solutions.
        </div>

        {/* CTA Button */}
        <button className="bg-custom-blue  hover:bg-blue-700 transition-colors w-fit mx-auto md:mx-0 text-white px-6 py-3 font-bold tracking-widest rounded-full text-lg sm:text-xl mt-6 flex items-center gap-2 shadow-md">
          <Link to="/create-smartforms">Launch SmartForm</Link>
          <GoArrowUpRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
