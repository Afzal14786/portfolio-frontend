export interface Blog {
  id: string;
  topic: string;
  subject: string; // <-- New field added here
  readTime: string;
  title: string;
  postingDate: string;
  updatedDate?: string;
  description: string;
  tags: string[];
  imageUrl?: string;
}