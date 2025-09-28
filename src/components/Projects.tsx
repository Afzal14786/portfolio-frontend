import React from 'react';
import ProjectCard from './cards/ProjectCard';
import type { ProjectEntry } from '../types/Project';

const initialProjectData: ProjectEntry[] = [
  {
    id: 'p1',
    title: 'Task Management System',
    description: 'A full-stack task management application with real-time updates and collaborative features using Socket.io for live data sync. A full-stack task management application with real-time updates and collaborative features using Socket.io for live data sync.',
    status: 'completed',
    techStack: ['JavaScript', 'Node.js', 'MongoDB', 'Socket.io'],
    codeLink: 'https://github.com/user/task-manager-repo',
    imageUrl: 'https://placehold.co/600x400/0F172A/4CAF50?text=Task+App',
    demoLink: 'https://demo.taskmanager.com',
  },
  {
    id: 'p2',
    title: 'Data Structures Visualizer',
    description: 'Interactive web application for visualizing common data structures and algorithms using HTML Canvas, helping students learn complex concepts.',
    status: 'in_progress',
    techStack: ['TypeScript', 'HTML5 Canvas', 'React'],
    codeLink: 'https://github.com/user/dsa-visualizer-repo',
    imageUrl: 'https://placehold.co/600x400/0F172A/4CAF50?text=DSA+Visualizer',
  },
  {
    id: 'p3',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with React and FastAPI featuring blog functionality and analytics dashboard integration.',
    status: 'completed',
    techStack: ['React', 'FastAPI', 'MongoDB', 'Tailwind CSS'],
    codeLink: 'https://github.com/user/portfolio-repo',
    imageUrl: 'https://placehold.co/600x400/0F172A/4CAF50?text=Portfolio',
    demoLink: 'https://live.portfolio.com',
  },
  {
    id: 'p4',
    title: 'E-commerce API Gateway',
    description: 'A robust microservice architecture for handling product catalog, inventory, and order processing, built for high availability and low latency.',
    status: 'planned',
    techStack: ['Go', 'Kubernetes', 'PostgreSQL', 'Kafka'],
    codeLink: 'https://github.com/user/ecomm-gateway-repo',
    imageUrl: 'https://placehold.co/600x400/0F172A/4CAF50?text=API+Gateway',
  },
  {
    id: 'p5',
    title: 'Fitness Tracker App',
    description: 'Mobile-first application for logging workouts and tracking daily nutrition using a dedicated REST API.',
    status: 'completed',
    techStack: ['React Native', 'Firebase', 'Redux'],
    codeLink: 'https://github.com/user/fitness-tracker-repo',
    imageUrl: 'https://placehold.co/600x400/0F172A/4CAF50?text=Fitness+App',
    demoLink: 'https://demo.fitness-app.com',
  },
  {
    id: 'p6',
    title: 'Serverless Image Processor',
    description: 'An AWS Lambda function setup to automatically resize and optimize images uploaded to S3 buckets.',
    status: 'completed',
    techStack: ['AWS Lambda', 'S3', 'Node.js', 'Serverless'],
    codeLink: 'https://github.com/user/image-processor-repo',
    imageUrl: 'https://placehold.co/600x400/0F172A/4CAF50?text=Image+Processor',
  }
];

const Projects: React.FC = () => {
  return (
    <section
      className="
        px-4 sm:px-12 py-10 
        bg-gradient-to-b from-[#0b132b] via-[#1c2541] to-[#3a506b] 
        min-h-screen
      "
    >
      <h2
        className="
          text-3xl sm:text-5xl font-extrabold mb-4 text-transparent
          bg-clip-text
          bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600
          drop-shadow-lg
          text-center
          select-none
        "
      >
        Projects
      </h2>

      <p
        className="
          text-center
          text-indigo-200
          text-lg
          max-w-xl
          mx-auto
          mb-10
          font-medium
          tracking-wide
          drop-shadow-md
        "
      >
        Review all the projects below and explore the exciting work I've built across different technologies.
      </p>

      <div 
        className="
          flex flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-6
          overflow-x-auto sm:overflow-x-scroll pb-4 px-1
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] 
          [scrollbar-width:none]
        "
      >
        {initialProjectData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;