import React from 'react';
import SkillCard from './cards/SkillCard'; 

// icons for testing only
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


const TechnicalSection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-16 sm:py-24 px-4">
      
      {/* Header Content */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-4">
          Technical Expertise
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          A comprehensive skill set spanning from fundamental concepts to modern development technologies
        </p>
      </div>

      <div className="
        flex
        flex-nowrap
        gap-8
        max-w-7xl
        mx-auto
        overflow-x-auto
        pb-6
        px-4
        md:justify-center
        scrollbar-hide          
      ">
        
        {/* Card 1 */}
        <SkillCard
          title="Programming Languages"
          icon={<CodeIcon />}
          tags={['JavaScript', 'C++', 'Python', 'SQL']}
        />

        {/* Card 2: Core Concepts (Highlight/Active State) */}
        <SkillCard
          title="Core Concepts"
          icon={<ChipIcon />}
          tags={['DSA', 'OOPs', 'System Design', 'Computer Networking']}
          isHighlighted={true}
        />

        {/* Card 3 */}
        <SkillCard
          title="Databases & Tools"
          icon={<DatabaseIcon />}
          tags={['DBMS', 'MongoDB', 'Docker', 'Git']}
        />

        {/* Card 4 */}
        <SkillCard
          title="Development"
          icon={<DevelopmentIcon />}
          tags={['React', 'FastAPI', 'GitHub', 'Full Stack']}
        />

        {/* Card 5: Extra Card to force scroll */}
        <SkillCard
          title="Cloud & DevOps"
          icon={<CloudIcon />}
          tags={['AWS', 'Azure', 'Kubernetes', 'Terraform']}
        />

        {/* Card 6: Extra Card to force scroll */}
        <SkillCard
          title="Quality Assurance"
          icon={<TestingIcon />}
          tags={['Jest', 'Cypress', 'TDD', 'Unit Testing']}
        />
      </div>
    </section>
  );
};

export default TechnicalSection;