import { api } from '../lib/api';
import type { ApiResponse } from '../types/common';
import type {UserProfile} from "../types/profile";
import type { Skill } from '../types/skill';
import type { Project } from '../types/project';
import type { Journey } from '../types/journey';


export const ProfileService = {
  /**
   * Fetch public profile information to display on the portfolio
   */
  getPublicProfile: async (): Promise<ApiResponse<UserProfile>> => {
    return api.get('/profile');
  },

  /**
   * Fetch all active skills from the public portfolio endpoint
   */
  getPublicSkills: async (): Promise<ApiResponse<Skill[]>> => {
    return api.get('/portfolio/skills');
  },

  /**
   * Fetch all active projects from the public portfolio endpoint
   */
  getPublicProjects: async (): Promise<ApiResponse<Project[]>> => {
    return api.get('/portfolio/projects');
  },

  /**
   * Fetch all journey entries from the public portfolio endpoint
   */
  getPublicJourneys: async (): Promise<ApiResponse<Journey[]>> => {
    return api.get('/portfolio/journey');
  }
};