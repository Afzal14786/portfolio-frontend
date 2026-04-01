import { api } from '../lib/api';
import type { BlogFetchResponse, SingleBlogResponse } from '../types/blog';

export const BlogService = {
  /**
   * Fetch all blogs marked as 'published' for the public portfolio
   */
  getPublishedBlogs: async (): Promise<BlogFetchResponse> => {
    return api.get('/blogs/published');
  },

  /**
   * Fetch a single, full blog post by its URL slug
   */
  getBlogBySlug: async (slug: string): Promise<SingleBlogResponse> => {
    return api.get(`/blogs/${slug}`);
  }
};