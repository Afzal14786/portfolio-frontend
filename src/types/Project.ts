export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  techStack: string[];
  codeLink: string;
  imageUrl: string; 
  demoLink?: string;
}
