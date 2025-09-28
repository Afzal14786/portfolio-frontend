import {
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLaptopCode,
  FaBlog,
} from "react-icons/fa";

const HomeSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl md:gap-12">
        
        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Md Afzal Ansari
          </h1>
          <h4 className="text-xl font-semibold mb-4 text-cyan-400">
            Full Stack Developer & Problem Solver
          </h4>
          <p className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
            Crafting innovation with modern technologies, passionate about DSA,
            System Design and building scalable systems.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start">
            <button className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-2 rounded-lg hover:bg-cyan-700 transition shadow shadow-cyan-500/50">
              <FaLaptopCode />
              View Projects
            </button>
            <button className="flex items-center gap-2 border border-cyan-400 text-cyan-400 px-5 py-2 rounded-lg hover:bg-cyan-600 hover:text-white transition shadow shadow-cyan-500/20">
              <FaBlog />
              My Blog Page
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <a
              href="https://github.com/afzal14786"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-cyan-600 text-white hover:scale-105 transform transition flex items-center justify-center shadow-md"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com/mdafzal14786"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-pink-600 text-white hover:scale-105 transform transition flex items-center justify-center shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/mdafzal14786"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-blue-500 text-white hover:scale-105 transform transition flex items-center justify-center shadow-md"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com/mdafzal14786"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-indigo-600 text-white hover:scale-105 transform transition flex items-center justify-center shadow-md"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* GIF Section */}
        <div className="flex-1 mt-10 md:mt-0 flex items-center justify-center">
          <div className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg shadow-cyan-500/30">
            <img
              src="/images/dev-animation.gif"
              alt="Developer animation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
