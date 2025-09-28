import React from 'react';

interface TagProps { text: string; }
const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer">
      {text}
    </span>
  );
};

interface CardProps {
  title: string;
  icon: React.ReactNode;
  tags: string[];
  isHighlighted?: boolean;
}

const SkillCard: React.FC<CardProps> = ({ title, icon, tags, isHighlighted = false }) => {
    const iconGradient = (title: string) => {
        switch (title) {
            case 'Programming Languages': return 'from-cyan-500 to-teal-600';
            case 'Core Concepts': return 'from-blue-500 to-purple-600';
            case 'Databases & Tools': return 'from-pink-500 to-purple-500';
            case 'Development': return 'from-orange-500 to-red-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    const baseClasses = `
        relative
        bg-gray-800
        rounded-xl
        p-6
        shadow-xl
        transition-all
        duration-500
        group
        min-w-[280px]          
        w-full 
        max-w-xs
        h-auto
        flex flex-col
        justify-between
        items-center
        text-center
        cursor-pointer
    `;

    const hoverClasses = `
        hover:scale-[1.02]
        hover:shadow-2xl hover:shadow-purple-400/40 
    `;

    const highlightedClasses = isHighlighted
        ? 'shadow-[0_0_15px_rgba(20,184,166,0.6)] scale-[1.02]' 
        : '';


  return (
    <div className={`${baseClasses} ${hoverClasses} ${highlightedClasses}`}>
      
      {/* Icon */}
      <div className={`
        w-20 h-20
        bg-gradient-to-br ${iconGradient(title)}
        rounded-full
        flex items-center justify-center
        mb-4
        ring-4 ring-gray-700
        group-hover:ring-purple-500
        transition-all duration-500
      `}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-100 mb-6 group-hover:text-white transition-colors duration-500">
        {title}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </div>
    </div>
  );
};

export default SkillCard;