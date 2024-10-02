import { FaRegCircleCheck } from "react-icons/fa6";

const HowItWorks = () => {
  return (
    <div className="px-96 my-16 space-y-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-bold text-custom-blue flex justify-start items-center gap-1">
            <FaRegCircleCheck />
            <span>Simple to use</span>
          </div>
          <div className="text-3xl font-bold">How it works</div>
        </div>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center  col-span-2">
          1
        </div>
        <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center  col-span-3">
          2
        </div>
        <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center  col-span-3">
          3
        </div>
        <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center  col-span-2">
          4
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
