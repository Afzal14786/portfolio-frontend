import { api } from '../lib/api';
import type { ApiResponse } from '../types/common';

export interface ProfileInfo {
  name: string;
  user_name: string;
  bio: string;
  location: string;
  socialMedia: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
  profile_image?: string;
  banner_image?: string;
  resume?: string;
}

export const ProfileService = {
  /**
   * Fetch public profile information to display on the portfolio
   */
  getPublicProfile: async (): Promise<ApiResponse<ProfileInfo>> => {
    return api.get('/admin/profile/info');
  }
};