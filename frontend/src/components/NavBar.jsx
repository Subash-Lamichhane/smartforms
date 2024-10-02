import { FaGithub } from "react-icons/fa";
import { SiFormspree } from "react-icons/si";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="px-96 py-6 shadow-md flex justify-between items-center bg-white">
        <Link to="/">
      <div className="text-2xl font-black flex gap-4 justify-center items-center">
          <SiFormspree />
          <span className="tracking-wider">smartform</span>
      </div>
        </Link>
      <div>
        <ul className="flex justify-center items-center space-x-12 font-semibold text-base tracking-wider">
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/">Explore</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-500">Feature</li>
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/create-smartforms">Create</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-500">Demo</li>
        </ul>
      </div>
      <div className="text-4xl">
        <FaGithub />
      </div>
    </div>
  );
};

export default NavBar;
