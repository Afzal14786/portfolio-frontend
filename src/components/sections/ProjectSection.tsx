import { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProfileService } from '../../services/profile.service';
import type { Project } from '../../types/project';

interface ProjectFetchResponse {
  data?: {
    projects?: Project[];
  };
  projects?: Project[];
}

const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = (await ProfileService.getPublicProjects()) as unknown as ProjectFetchResponse;
        const fetchedProjects: Project[] = response?.data?.projects || response?.projects || [];
        
        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="relative py-20 flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-400"></div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            A selection of my recent work, showcasing complex problem solving and modern tech stacks.
          </p>
        </div>

        {/* Dynamic Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project: Project) => {
            const isComplete = project.status === 'complete';
            const imageUrl = project.imageUrl || '/images/default_banner.jpg';

            return (
              <div 
                key={project._id}
                className="group flex flex-col bg-white/60 backdrop-blur-md border border-white/60 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Top Half: Image & Status Badge */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img 
                    src={imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Status Pill - Removed blur for performance */}
                  <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 bg-white/90 border border-white rounded-full shadow-md">
                    {isComplete ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Complete</span>
                      </>
                    ) : (
                      <>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">In Progress</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Half: Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white/80 border border-slate-200 rounded-lg shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1.5 text-xs font-bold text-slate-500 bg-white/60 border border-slate-200 rounded-lg">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto flex items-center gap-4 pt-4 border-t border-slate-200/50">
                    {project.demoLink && (
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-md"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.codeLink && (
                      <a 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white/90 hover:bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-all shadow-sm"
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectSection;