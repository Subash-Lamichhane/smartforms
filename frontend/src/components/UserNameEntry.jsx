import { useState } from "react";

const UserNameEntry = ({ onStartSmartForm }) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName) {
      onStartSmartForm(userName); // Pass the name to the parent component
    }
  };

  return (
    <div className="flex items-center justify-start">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start py-6 space-y-4 w-full max-w-md"
      >
        <p className="text-gray-600 mb-2">Enter your name to begin.</p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-custom-blue/90 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-custom-blue w-full transition duration-200"
          placeholder="Your Name"
          required
        />
        <button
          type="submit"
          className="bg-custom-blue/90 text-white font-bold px-6 py-2 rounded-md hover:bg-custom-blue transition duration-300 w-full"
        >
          Start Form
        </button>
      </form>
    </div>
  );
};

export default UserNameEntry;
