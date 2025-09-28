import React, { useState } from 'react';
import type { ProjectEntry } from '../../types/Project.ts';
import githubIcon from "../../assets/github.png";
import openLink from "../../assets/openLink.png";

const PROJECT_ICON = (
  <svg
    className="w-16 h-16 text-[#4CAF50] group-hover:text-cyan-400 transition duration-300"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 8l-4 4l4 4"></path>
    <path d="M12 16l4-4l-4-4"></path>
  </svg>
);

const MAX_DESCRIPTION_LENGTH = 150;

interface ProjectCardProps {
  project: ProjectEntry;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, status, techStack, codeLink, demoLink, imageUrl } = project;

  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = description.length > MAX_DESCRIPTION_LENGTH;

  const getStatusClasses = (currentStatus: ProjectEntry['status']) => {
    switch (currentStatus) {
      case 'completed': return 'bg-green-600/70 text-white';
      case 'in_progress': return 'bg-yellow-600/70 text-gray-900';
      case 'planned': return 'bg-blue-600/70 text-white';
      default: return 'bg-gray-500/70 text-white';
    }
  };

  return (
    <div
      className={`
        flex flex-col w-full max-w-xs sm:max-w-sm 
        ${isExpanded ? 'min-h-fit' : 'h-[450px]'} 
        flex-shrink-0 bg-gray-800/80 rounded-xl shadow-lg 
        hover:shadow-cyan-400/40 transition duration-300 
        overflow-hidden border border-gray-700/50 group
      `}
    >
      {/* Image Section */}
      <div className="relative h-40 flex justify-center items-center bg-gray-900/50 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} project screenshot`}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/600x400/0F172A/4CAF50?text=Image+Error`;
            }}
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            {PROJECT_ICON}
          </div>
        )}

        {/* Status Tag */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusClasses(status)}`}>
          {status.replace('_', ' ')}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Gradient Title */}
        <h3 className="text-lg sm:text-xl font-bold mb-1 bg-gradient-to-r from-cyan-400 to-[#4CAF50] bg-clip-text text-transparent truncate">
          {title}
        </h3>

        {/* Description */}
        <div className="text-gray-400 text-xs sm:text-sm mb-2 leading-relaxed">
          <p>
            {isExpanded || !isLongDescription
              ? description
              : `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`}

            {isLongDescription && (
              <span
                className="text-cyan-400 font-semibold ml-1 cursor-pointer select-none"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? 'less' : 'more'}
              </span>
            )}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-3">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs sm:text-sm font-medium text-cyan-400 bg-gray-700/50 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-700/50 mt-auto">
          {/* GitHub Code Button */}
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-white text-sm font-semibold transition duration-300 shadow-md
              ${demoLink ? 'bg-gray-700 hover:bg-gray-600' : 'bg-cyan-600 hover:bg-cyan-500'}`}
          >
            <img src={githubIcon} alt="GitHub Icon" className="w-4 h-4 mr-2 filter invert" />
            Github Code
          </a>

          {/* Demo Link */}
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg font-bold text-gray-900 
                bg-gradient-to-r from-[#4CAF50] to-cyan-400 hover:from-cyan-400 hover:to-[#4CAF50] 
                transition duration-300 shadow-lg text-sm"
            >
              <img src={openLink} alt="Open Link Icon" className="w-4 h-4 mr-2" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
