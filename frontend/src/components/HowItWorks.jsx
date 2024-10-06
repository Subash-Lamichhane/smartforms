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
          <div className="text-4xl font-extrabold text-gray-800">
            How it works
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gray-100 shadow-md rounded-2xl h-80 flex flex-col items-start gap-4 justify-center col-span-3 p-8 hover:shadow-lg transition-transform duration-300">
          <p className="font-black tracking-widest text-gray-600 text-base">1. Create with Copilotkit</p>
          <img
            src="/img/Creating Smart Form with Copilotkit.png"
            alt="Create Smartform with Coplilotkit"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-gray-100 shadow-md rounded-2xl h-80 flex flex-col items-start gap-4 justify-center col-span-2 p-12 hover:shadow-lg transition-transform duration-300 ">
          <p className="font-black tracking-widest text-gray-600 text-base">2. SmartForm Created</p>
          <img
            src="/img/SmartFrom Created Successfully.png"
            alt="SmartForm created successfully"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-gray-100 shadow-md rounded-2xl h-80 flex flex-col items-start gap-4 justify-center col-span-2 p-6 hover:shadow-lg transition-transform duration-300">
          <p className="font-black tracking-widest text-gray-600 text-base">3. Access SmartForm</p>
          <img
            src="/img/User Taking Smart Form.png"
            alt="User Taking the SmartFrom"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
        <div className="bg-gray-100 shadow-md rounded-2xl h-80 flex flex-col items-start gap-4 justify-center col-span-3 p-6 hover:shadow-lg transition-transform duration-300">
          <p className="font-black tracking-widest text-gray-600 text-base">4. Viewing Responses</p>
          <img
            src="/img/Smart Form Responses.png"
            alt="SmartForm Responses"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
