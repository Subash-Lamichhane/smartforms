import { FaGithub } from "react-icons/fa";
import { SiFormspree } from "react-icons/si";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="px-24 lg:px-96 py-6 shadow-md flex justify-between items-center bg-white z-10">
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
          <li className="cursor-pointer hover:text-blue-500">
            <Link to="/smartforms/create">Create</Link>
          </li>
          <li className="cursor-pointer hover:text-blue-500">Demo</li>
        </ul>
      </div>
      <a href="https://github.com/Subash-Lamichhane">
        <div className="text-4xl">
          <FaGithub />
        </div>
      </a>
    </div>
  );
};

export default NavBar;
