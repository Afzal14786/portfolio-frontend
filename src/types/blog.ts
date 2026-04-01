export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  topic: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  views: number;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  publishedAt: string;
}