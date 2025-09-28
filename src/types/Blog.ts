export interface Blog {
  id: string;
  topic: string;
  readTime: string;
  title: string;
  postingDate: string;
  updatedDate?: string;
  description: string;
  tags: string[];
  imageUrl?: string;
}