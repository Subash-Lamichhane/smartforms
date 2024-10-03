import { FaRegCircleCheck } from "react-icons/fa6";

const HowItWorks = () => {
  return (
    <div className="px-8 lg:px-96 my-16 space-y-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-bold text-custom-blue flex justify-start items-center gap-1">
            <FaRegCircleCheck />
            <span>Simple to use</span>
          </div>
          <div className="text-4xl font-extrabold text-gray-800">How it works</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gray-100 shadow-md rounded-2xl h-64 flex items-center justify-center col-span-2 p-6 hover:shadow-lg transition-transform duration-300">
          <img src="/img/one.png" alt="Step 1" className="h-full w-full object-cover rounded-2xl" />
        </div>
        <div className="bg-gray-100 shadow-md rounded-2xl h-64 flex items-center justify-center col-span-3 p-6 hover:shadow-lg transition-transform duration-300">
          <img src="/img/two.png" alt="Step 2" className="h-full w-full object-cover rounded-2xl" />
        </div>
        <div className="bg-gray-100 shadow-md rounded-2xl h-64 flex items-center justify-center col-span-3 p-6 hover:shadow-lg transition-transform duration-300">
          <img src="/img/three.png" alt="Step 3" className="h-full w-full object-cover rounded-2xl" />
        </div>
        <div className="bg-gray-100 shadow-md rounded-2xl h-64 flex items-center justify-center col-span-2 p-6 hover:shadow-lg transition-transform duration-300">
          <img src="/img/four.png" alt="Step 4" className="h-full w-full object-cover rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
