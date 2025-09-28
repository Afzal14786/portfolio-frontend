import React from 'react';
import JourneyCard from './cards/JourneyCard';
import type { JourneyEntry } from '../types/Journey';

// Mock Data 
const initialJourneyData: JourneyEntry[] = [
  {
    id: '1',
    year: 2020,
    title: 'Started Programming Journey',
    description: 'Began learning programming with C++ and foundational computer science concepts, spending countless hours debugging simple syntax errors and building a solid base in logic and problem-solving. This initial phase was challenging but foundational, instilling a deep appreciation for computing principles that I carry into my professional work today.',
  },
  {
    id: '2',
    year: 2021,
    title: 'Mastered DSA & OOPs',
    description: 'Deep dive into Data Structures (linked lists, trees, graphs) and Algorithms, combined with rigorous practice of Object-Oriented Programming principles. This was crucial for writing efficient, maintainable, and scalable code structures used in complex applications, securing my first internship opportunity.',
  },
  {
    id: '3',
    year: 2022,
    title: 'Full-Stack Development',
    description: 'Began working with React for the frontend, Node.js/Express for the backend, and modern database systems like MongoDB and PostgreSQL. I built my first three end-to-end applications in this year, learning about API design, deployment workflows, and basic DevOps practices.',
  },
  {
    id: '4',
    year: 2023,
    title: 'Focus on System Design',
    description: 'Shifted focus to large-scale system architecture, learning about microservices, caching layers (Redis), message queues (Kafka), and scalability principles to prepare for senior-level engineering challenges and improve the performance of existing projects.',
  },
  {
    id: '5',
    year: 2024,
    title: 'Deployed First Major Project',
    description: 'Launched a scalable SaaS application on a cloud platform (AWS/Azure), focusing heavily on CI/CD pipelines, security best practices, and performance monitoring. This project involved migrating legacy services and significantly improved my deployment automation skills.',
  },
  {
    id: '6',
    year: 2024,
    title: 'Deployed First Major Project',
    description: 'Launched a scalable SaaS application on a cloud platform (AWS/Azure), focusing heavily on CI/CD pipelines, security best practices, and performance monitoring. This project involved migrating legacy services and significantly improved my deployment automation skills.',
  },
];

const Journey: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#0c0c1e] to-[#1a1a2e] py-16 sm:py-24 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500 mb-3">
            My Journey
          </h2>
          <p className="text-lg text-gray-400">
            The path from curious beginner to passionate developer
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Vertical Timeline Line (Centered, Desktop only) */}
          <div 
            className="absolute left-1/2 w-[2px] bg-gradient-to-b from-transparent via-green-500 to-transparent h-full transform -translate-x-1/2 hidden lg:block"
          ></div>
          
          <div className="flex flex-col lg:items-start"> 
            {initialJourneyData.map((entry, index) => (
              <JourneyCard
                key={entry.id}
                entry={entry}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Journey;