import { api } from '../lib/api';
import type { Blog } from '../types/blog';
import type { ApiResponse, PaginatedResponse } from '../types/common';

export interface BlogFilters {
  page?: number;
  limit?: number;
  topic?: string;
  tag?: string;
  search?: string;
  sort?: 'newest' | 'popular' | 'trending';
}

export const BlogService = {
  /**
   * Fetch all published blogs with optional filtering and pagination
   */
  getPublishedBlogs: async (filters?: BlogFilters): Promise<PaginatedResponse<Blog>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    return api.get(`/blogs?${params.toString()}`);
  },

  /**
   * Fetch a single blog's details by its slug
   */
  getBlogBySlug: async (slug: string): Promise<ApiResponse<{ blog: Blog, relatedBlogs: Blog[] }>> => {
    return api.get(`/blogs/${slug}`);
  }
};