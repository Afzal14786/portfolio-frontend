import React from 'react';
import { Github, Coffee, Twitter, Facebook, Instagram, Code } from 'lucide-react';

const socialLinks = [
  { name: 'Github', Icon: Github, href: '#github' },
  { name: 'Instagram', Icon: Instagram, href: '#instagram' },
  { name: 'Twitter', Icon: Twitter, href: '#twitter' },
  { name: 'Facebook', Icon: Facebook, href: '#facebook' },
  { name: 'Leetcode', Icon: Code, href: '#leetcode' },
];

const Connect: React.FC = () => {
  return (
    <section 
      className="
        px-4 sm:px-12 pt-10 pb-8
        bg-gradient-to-b from-[#0b132b] via-[#1c2541] to-[#3a506b] 
      "
    >
      <div className="text-center">
        <h2 className="
          text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-teal-400 to-cyan-500
        ">
          Let's Build Something Amazing
        </h2>

        {/* Subtitle */}
        <p className="
          mt-2 max-w-2xl mx-auto 
          text-lg text-gray-300
        ">
          Ready to collaborate on your next project? I'm always open to 
          discussing new opportunities and innovative ideas.
        </p>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          
          <a
            href="mailto:mdafzal14777@gmail.com"
            className="
              flex items-center justify-center
              w-full sm:w-auto px-8 py-3 
              text-lg font-semibold text-gray-900 
              bg-gradient-to-r from-teal-400 to-cyan-500
              rounded-lg shadow-lg 
              hover:shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out
              transform focus:outline-none focus:ring-4 focus:ring-cyan-500/50
            "
          >
            <Coffee className="w-5 h-5 mr-2" />
            Get In Touch
          </a>
          
          <a
            href="https://github.com/afzal14786"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center
              w-full sm:w-auto px-8 py-3 
              text-lg font-semibold text-gray-300 
              border border-gray-600 rounded-lg 
              hover:border-teal-400 hover:text-teal-400 
              transition duration-300 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-teal-400/50
            "
          >
            <Github className="w-5 h-5 mr-2" />
            View Github
          </a>
        </div>
      </div>

      {/* Separator Line */}
      <div className="mt-16 mb-8 border-t border-gray-700 max-w-2xl mx-auto"></div>

      {/* Social Media Icons */}
      <div className="flex justify-center items-center space-x-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            aria-label={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-gray-400 hover:text-teal-400 transition-colors duration-300
              p-2 rounded-full border border-transparent hover:border-teal-400
              transform hover:scale-110
            "
          >
            <link.Icon className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        ))}
      </div>
      
    </section>
  );
}

export default Connect;
