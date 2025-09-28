import React, { useState, useRef, useEffect } from 'react';
import type { JourneyEntry } from '../../types/Journey';

const DEVELOPER_ICON = '💻';
const MAX_HEIGHT_PX = 100; // Max height for collapsed state
const ICON_OFFSET = '[-20px]';

interface JourneyCardProps {
  entry: JourneyEntry;
  isEven: boolean;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ entry, isEven }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  
  const { year, title, description } = entry;

  // Check if content needs clamping on mount
  useEffect(() => {
    // Only check if content is longer than the MAX_HEIGHT_PX for clamping
    if (contentRef.current && contentRef.current.scrollHeight > MAX_HEIGHT_PX) {
      setIsClamped(true);
    } else {
      setIsClamped(false); 
    }
  }, [description]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const CARD_BG = 'bg-gray-800/80';
  const BORDER_COLOR = 'border-green-500/50';

  // Desktop Placement
  const wrapperClasses = isEven
    ? 'lg:left-0 lg:mr-10' // Left Card
    : 'lg:left-1/2 lg:ml-10'; // Right Card

  return (
    // On mobile, use pl-10 to make space for the vertical line on the left.
    <div
      className={`relative w-full mb-12 px-2 sm:px-4 lg:w-1/2 
                  transition-all duration-500 ease-in-out group 
                  pl-10 lg:pl-4 
                  ${wrapperClasses}`}
    >
      {/* Timeline Card Content */}
      <div
        className={`p-6 rounded-xl border border-dashed ${BORDER_COLOR} ${CARD_BG}
                    shadow-xl hover:shadow-green-500/30 transition duration-300 h-full`}
      >
        {/* Year */}
        <h3 className="text-base font-medium text-green-500 mb-1">{year}</h3>
        
        {/* Title */}
        <h4 className="text-2xl font-bold text-white mb-3">{title}</h4>
        
        {/* Description Container */}
        <div 
          style={{ 
            maxHeight: isExpanded ? '1000px' : `${MAX_HEIGHT_PX}px`,
            overflow: 'hidden', 
          }}
          className="transition-all duration-500 ease-in-out"
        >
            <p ref={contentRef} className="text-gray-300 leading-relaxed">
                {description}
            </p>
        </div>
        
        {/* "Read More/Less" button (Only visible if clamped) */}
        {isClamped && (
            <button 
                onClick={toggleExpand}
                className="text-green-400 text-sm mt-2 hover:underline focus:outline-none"
            >
                {isExpanded ? '... Read Less' : '... Read More'}
            </button>
        )}
      </div>

      {/* Timeline Dot/Icon (Developer Icon) */}
      <div
        className={`absolute top-0 sm:top-2 w-7 h-7 bg-gray-900 border-2 border-green-500 rounded-full z-20 
                    flex items-center justify-center text-sm
                    // Align to center line on desktop: using the custom offset
                    ${isEven ? `lg:right-${ICON_OFFSET}` : `lg:left-${ICON_OFFSET}`}
                    // Align to the left edge of the card on mobile
                    left-0 transform -translate-x-1/2 lg:translate-x-0`}
      >
        {DEVELOPER_ICON}
      </div>
      
      {/* Vertical Line Connector (MOBILE) */}
      <div 
        className={`absolute w-[2px] bg-green-500 top-7 h-[calc(100%-28px)] z-10 
                   left-0 transform -translate-x-1/2 
                   lg:hidden`} 
      ></div>

    </div>
  );
};

export default JourneyCard;