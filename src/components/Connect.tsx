import React from 'react';
import { Github, Coffee } from 'lucide-react'; 

// Import your custom images
import github from "/src/assets/github-2.png";
import instagram from "/src/assets/instagram.png";
import twitter from "/src/assets/twitter.png";
import facebook from "/src/assets/facebook.png";
import leetcode from "/src/assets/leetcode.png";
import linkedin from "/src/assets/linkedin.png";

// Social media links array using image paths
const socialLinks = [
  { name: 'GitHub', image: github, href: 'https://github.com/afzal14786' },
  { name: 'LinkedIn', image: linkedin, href: 'https://linkedin.com/in/yourprofile'},
  { name: 'Leetcode', image: leetcode, href: 'https://leetcode.com/yourprofile' },
  { name: 'Instagram', image: instagram, href: 'https://instagram.com/mdafzal14786'},
  { name: 'Twitter', image: twitter, href: 'https://twitter.com/mdafzal14786'},
  { name: 'Facebook', image: facebook, href: 'https://facebook.com/mdafzal14786'},
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

        {/* Action Buttons Container (Lucide icons for primary actions) */}
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

      {/* Social Media Icons (Using custom images and circular hover effect) */}
      <div className="flex justify-center items-center space-x-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            aria-label={link.name}
            target="_blank"
            rel="noopener noreferrer"
            // The 'a' tag creates the circular, transparent, hoverable area
            className={`
              w-12 h-12 // Fixed size for the clickable area
              flex items-center justify-center // Center the image
              rounded-full // Make the hover border circular
              border border-transparent 
              hover:border-teal-400 // Border appears on hover
              transform hover:scale-110 
              transition duration-300 ease-in-out
            `}
          >
            <img 
                src={link.image} 
                alt={`${link.name} Icon`} 
                className="w-8 h-8 sm:w-10 sm:h-10" 
            />
          </a>
        ))}
      </div>
      
    </section>
  );
}

export default Connect;