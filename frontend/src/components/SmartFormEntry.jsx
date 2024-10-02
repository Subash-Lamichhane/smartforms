import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SmartFormEntry = () => {
  const [formId, setFormId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formId) {
      navigate(`/smartforms/${formId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-8 p-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center ">
        Ready to take smartform?
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-lg">
        <span className="font-bold ">smartform</span> makes it easy to create and manage your forms seamlessly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex flex-col items-center">
          <input
            type="text"
            id="smartformId"
            value={formId}
            onChange={(e) => setFormId(e.target.value)}
            className="border border-custom-blue rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue w-64 md:w-80 lg:w-96"
            placeholder="Enter SmartForm ID"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-custom-blue text-white font-bold px-6 py-2 rounded-lg hover:bg-custom-blue/80 transition duration-300"
        >
          Submit
        </button>
      </form>
      <p className="text-gray-500 text-sm mt-4">
        Don’t have a SmartForm ID?{" "}
        <a
          href="/smartform/create"
          className="text-custom-blue hover:underline"
        >
          Create one here.
        </a>
      </p>
    </div>
  );
};

export default SmartFormEntry;
