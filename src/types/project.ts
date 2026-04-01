export interface Project {
  _id: string;
  title: string;
  description: string;
  status: 'inprocess' | 'complete';
  techStack: string[];
  codeLink?: string;
  demoLink?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}