export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  metaDescription?: string;
  coverImage?: string | { url: string };
  tags: string[];
  readTime?: string;
  createdAt?: string;
  publishedAt?: string;
}

export interface BlogComment {
  _id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface RelatedBlog {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string | { url: string };
  publishedAt?: string;
}

export interface BlogFetchResponse {
  success: boolean;
  data: {
    blogs: Blog[];
    totalPages: number;
    currentPage: number;
    total: number;
  };
}

export interface SingleBlogResponse {
  success: boolean;
  data: {
    blog: Blog;
    comments?: BlogComment[];
    relatedBlogs?: RelatedBlog[];
  };
}