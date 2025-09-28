import React, { useRef, useEffect } from 'react';
import SkillCard from './cards/SkillCard'; 

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
const ChipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 17h10a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2zm12-7a1 1 0 11-2 0 1 1 0 012 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);
const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10l2 2h10l2-2V7m-2 0H6a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" />
  </svg>
);
const DevelopmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);
const TestingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.016M12 2.944c2.64 0 5.163.924 7.07 2.465" />
  </svg>
);


interface SkillData {
    id: number;
    title: string;
    icon: React.FC;
    tags: string[];
    isHighlighted?: boolean;
}

const ALL_SKILLS: SkillData[] = [
    { id: 1, title: 'Programming Languages', icon: CodeIcon, tags: ['JavaScript', 'C++', 'Python', 'SQL'] },
    { id: 2, title: 'Core Concepts', icon: ChipIcon, tags: ['DSA', 'OOPs', 'System Design', 'Computer Networking'], isHighlighted: true },
    { id: 3, title: 'Databases & Tools', icon: DatabaseIcon, tags: ['DBMS', 'MongoDB', 'Docker', 'Git'] },
    { id: 4, title: 'Development', icon: DevelopmentIcon, tags: ['React', 'FastAPI', 'GitHub', 'Full Stack'] },
    { id: 5, title: 'Cloud & DevOps', icon: CloudIcon, tags: ['AWS', 'Azure', 'Kubernetes', 'Terraform'] },
    { id: 6, title: 'Quality Assurance', icon: TestingIcon, tags: ['Jest', 'Cypress', 'TDD', 'Unit Testing'] },
];

const TechnicalSection: React.FC = () => {
    const skills = ALL_SKILLS; 
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const CARD_MIN_WIDTH = 280; 
    const CARD_GAP = 32;
    
    const totalOriginalCards = skills.length;
    const cardSlotWidth = CARD_MIN_WIDTH + CARD_GAP; 
    const loopStartBoundary = totalOriginalCards * cardSlotWidth; 

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            if (scrollLeft >= loopStartBoundary) {
                container.scrollLeft = scrollLeft - loopStartBoundary;
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [loopStartBoundary]);

    const duplicatedSkills = skills.slice(0, 2); 
    const allCardsToRender = [...skills, ...duplicatedSkills];

  return (
    <section className="bg-gray-900 py-16 sm:py-24">
      
      {/* Header Content */}
      <div className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-4">
          Technical Expertise
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          A comprehensive skill set spanning from fundamental concepts to modern development technologies
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="
            flex
            flex-nowrap
            gap-8
            mx-auto                  
            w-full                  
            overflow-x-auto         
            pb-6                    
            pl-4 sm:pl-6 lg:pl-8    
            pr-80                   
            scrollbar-hide          
      ">
        
        {allCardsToRender.map((skill, index) => (
            <SkillCard
                key={`${skill.id}-${index}`}
                title={skill.title}
                icon={<skill.icon />}
                tags={skill.tags}
                isHighlighted={skill.isHighlighted}
            />
        ))}

      </div>
    </section>
  );
};

export default TechnicalSection;