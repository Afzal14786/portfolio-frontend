import { useState, useEffect } from 'react';
import { LayoutTemplate, Server, Database, Wrench, Code, Terminal, Cpu } from 'lucide-react';
import { ProfileService } from '../../services/profile.service'; 
import type { Skill } from '../../types/skill';

interface SkillFetchResponse {
  data?: {
    skills?: Skill[];
  };
  skills?: Skill[];
}

const getCategoryIcon = (categoryName: string) => {
  const cat = categoryName.toLowerCase();
  if (cat.includes('front')) return <LayoutTemplate size={24} className="text-blue-500" />;
  if (cat.includes('back')) return <Server size={24} className="text-green-600" />;
  if (cat.includes('data')) return <Database size={24} className="text-purple-500" />;
  if (cat.includes('devops') || cat.includes('tools')) return <Wrench size={24} className="text-orange-500" />;
  if (cat.includes('dsa') || cat.includes('oop')) return <Cpu size={24} className="text-indigo-500" />;
  if (cat.includes('mobile') || cat.includes('app')) return <Code size={24} className="text-pink-500" />;
  return <Terminal size={24} className="text-slate-500" />; 
};

const TechnicalSection = () => {
  const [groupedSkills, setGroupedSkills] = useState<Record<string, Skill[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = (await ProfileService.getPublicSkills()) as unknown as SkillFetchResponse;
        
        const allSkills: Skill[] = response?.data?.skills || response?.skills || [];
          
        if (allSkills.length > 0) {
          const groups = allSkills.reduce((accumulator: Record<string, Skill[]>, currentSkill: Skill) => {
            const category = currentSkill.tags && currentSkill.tags.length > 0 
              ? currentSkill.tags[0] 
              : 'Core Skills';
            
            if (!accumulator[category]) {
              accumulator[category] = [];
            }
            
            accumulator[category].push(currentSkill);
            return accumulator;
          }, {});

          setGroupedSkills(groups);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch technical skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="relative py-20 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-400"></div>
      </section>
    );
  }

  return (
    <section id="skills" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Technical Expertise
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            The core technologies and tools I use to build scalable, secure, and beautiful full-stack applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {Object.entries(groupedSkills).map(([categoryName, skills], index) => (
            <div 
              key={index}
              className="group p-6 sm:p-8 bg-white/50 backdrop-blur-md border border-white/60 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/80 border border-white/80 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {getCategoryIcon(categoryName)}
                </div>
                <h3 className="text-xl font-bold text-slate-800 capitalize">
                  {categoryName}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill: Skill) => (
                  <span 
                    key={skill._id}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white/70 border border-white/80 rounded-xl hover:bg-white hover:text-slate-900 transition-colors cursor-default shadow-sm"
                  >
                    {skill.icon && (
                      <img 
                        src={skill.icon} 
                        alt={skill.title} 
                        className="w-4 h-4 object-contain drop-shadow-sm"
                      />
                    )}
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechnicalSection;