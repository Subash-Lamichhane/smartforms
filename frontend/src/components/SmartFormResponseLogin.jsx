import { useState } from "react";
import { FaLockOpen } from "react-icons/fa"; // Import the lock open icon

const SmartFormResponseLogin = ({ error, handleSubmit }) => {
  const [quizId, setQuizId] = useState(""); // To store the entered SmartForm ID
  const [password, setPassword] = useState(""); // To store the entered password

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      {/* Main Heading */}
      <h2 className="text-2xl md:text-3xl font-black tracking-wider text-center mb-2">
        Access Your<span className="underline"> smartform</span> Responses
      </h2>

      {/* Description */}
      <p className="text-base text-gray-500 text-center max-w-lg mb-4">
        Please enter your <span className="font-bold">SmartForm ID</span> and
        password to securely view the responses associated with your form.
      </p>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(quizId, password);
        }}
        className="flex flex-col items-center space-y-3 "
      >
        <div className="flex flex-col items-center mb-2">
          <input
            type="text"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            className="border border-custom-blue rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue w-64 md:w-80 lg:w-96"
            placeholder="Enter SmartForm ID"
            required
          />
        </div>
        <div className="flex flex-col items-center mb-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-custom-blue rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-blue w-64 md:w-80 lg:w-96"
            placeholder="Enter Password"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}
        <button
          type="submit"
          className="bg-custom-blue text-white font-bold px-6 py-2 rounded-lg hover:bg-custom-blue/80 transition duration-300"
        >
          View Responses
        </button>
      </form>

      {/* Link for creating a SmartForm ID */}
      <p className="text-gray-500 text-sm mt-4">
        Don’t have a SmartForm ID?{" "}
        <a
          href="/smartforms/create"
          className="text-custom-blue hover:underline"
        >
          Create one here.
        </a>
      </p>
    </div>
  );
};

export default SmartFormResponseLogin;
