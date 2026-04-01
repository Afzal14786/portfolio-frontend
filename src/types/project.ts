export interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'complete' | 'inprocess';
  techStack: string[];
  codeLink?: string;
  demoLink?: string;
  imageUrl?: string;
}