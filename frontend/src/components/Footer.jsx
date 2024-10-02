import { SiFormspree } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 lg:px-96">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0">
        {/* Logo and CTA */}
        <div className="flex flex-col space-y-4 items-center lg:items-start">
          <div className="flex items-center space-x-2">
            <span className="font-black text-2xl flex justify-center items-center gap-1">
              <SiFormspree />
              <span className="tracking-wider">smartform</span>
            </span>
          </div>
          <button className="bg-custom-blue hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-full">
            Start for free
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-16 text-center lg:text-left">
          {/* Pages */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Pages</h3>
            <ul className="space-y-2 text-base text-gray-400">
              <li>Blog</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Links</h3>
            <ul className="space-y-2 text-base text-gray-400">
              <li>Sign in</li>
              <li>LinkedIn</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2 text-base text-gray-400">
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center lg:text-left">
        <p className="text-sm text-gray-500">© smartform 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
